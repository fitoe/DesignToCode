#!/usr/bin/env python3
"""Contract tests for DesignToCode P2D provider admission and manifests."""
from __future__ import annotations

import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SCRIPT = ROOT / "skills" / "design-to-code" / "scripts" / "check-provider-context.py"
MANIFEST = ROOT / "contracts" / "provider-manifest.json"


class DesignToCodeProviderContractTests(unittest.TestCase):
    def test_provider_manifest_declares_visual_admission_contract(self) -> None:
        manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
        self.assertEqual(manifest["schema_version"], "provider-manifest/v1")
        self.assertEqual(manifest["provider_id"], "design-to-code")
        admission = manifest["admission_contract"]
        self.assertEqual(admission["task_schema"], "kanban-capability-task/v1")
        self.assertEqual(admission["active_slice_digest_schema"], "active-slice-digest/v1")
        self.assertEqual(admission["result_manifest_path"], "output_root/result-manifest.json")
        self.assertIn("running_card_required", admission["required_checks"])
        self.assertIn("approved_visual_source_required", admission["required_checks"])
        self.assertIn("page_contract_required", admission["required_checks"])
        self.assertIn("screenshot_or_parity_evidence_required", admission["required_checks"])

    def test_context_checker_accepts_valid_visual_task_and_result(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            output_root = root / "out"
            output_root.mkdir()
            source = root / "approved-home.png"
            source.write_bytes(b"fake image bytes")
            task = {
                "schema": "kanban-capability-task/v1",
                "task_id": "d2c-001",
                "capability": "visual_implementation",
                "project_root": str(root / "project"),
                "active_slice": {"id": "home", "summary": "homepage visual implementation"},
                "input_artifact_refs": [str(source)],
                "output_root": str(output_root),
                "expected_outputs": ["implementation-report.md", "screenshots/home-mobile.png", "parity-report.md", "result-manifest.json"],
                "verification_expectations": ["mobile screenshot evidence", "parity report"],
                "allowed_side_effects": ["edit target page files", "write output_root evidence"],
                "review_policy": {"visual_review_required": True},
                "blocking_policy": {"missing_approved_visual_source": "blocked"},
                "visual_contract": {
                    "approved_visual_source": str(source),
                    "target_pages": ["/pages/home/index"],
                    "pass_criteria": ["mobile screenshot matches approved source"],
                },
                "kanban_constraints": {"required": True, "blocks_interaction_api_until_visual_accepted": True},
            }
            digest = {
                "schema": "active-slice-digest/v1",
                "task_id": "d2c-001",
                "capability": "visual_implementation",
                "active_slice": {"id": "home"},
                "handoff": {"result_manifest_path": str(output_root / "result-manifest.json")},
                "artifact_refs": [str(source)],
            }
            result = {
                "schema": "kanban-capability-result/v1",
                "task_id": "d2c-001",
                "capability": "visual_implementation",
                "provider": "design-to-code",
                "result": "completed",
                "changed_files": ["src/pages/home/index.vue"],
                "produced_artifacts": ["implementation-report.md", "parity-report.md"],
                "evidence": [
                    {"type": "screenshot", "path": "screenshots/home-mobile.png"},
                    {"type": "parity_report", "path": "parity-report.md"},
                ],
                "blockers": [],
                "debts": [],
                "review_required": True,
                "visual_acceptance": {
                    "page_visual_ready": True,
                    "accepted_by_user_or_orchestrator": False,
                    "remaining_visual_debt": [],
                    "interaction_api_unblocked": False,
                },
                "suggested_kanban_updates": [
                    {"type": "visual_review", "title": "Review homepage visual implementation", "reason": "screenshots need acceptance"}
                ],
                "next_recommended_task": None,
            }
            task_path = output_root / "task-envelope.json"
            digest_path = output_root / "active-slice-digest.json"
            result_path = output_root / "result-manifest.json"
            task_path.write_text(json.dumps(task), encoding="utf-8")
            digest_path.write_text(json.dumps(digest), encoding="utf-8")
            result_path.write_text(json.dumps(result), encoding="utf-8")

            proc = subprocess.run(
                [sys.executable, str(SCRIPT), "--task", str(task_path), "--digest", str(digest_path), "--result", str(result_path), "--skip-running-check"],
                cwd=ROOT,
                text=True,
                capture_output=True,
                check=False,
            )
            self.assertEqual(proc.returncode, 0, proc.stdout + proc.stderr)
            self.assertIn("DesignToCode provider context check: PASS", proc.stdout)

    def test_context_checker_rejects_missing_approved_visual_source(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            output_root = root / "out"
            output_root.mkdir()
            task_path = output_root / "task-envelope.json"
            digest_path = output_root / "active-slice-digest.json"
            task_path.write_text(json.dumps({
                "schema": "kanban-capability-task/v1",
                "task_id": "d2c-001",
                "capability": "visual_implementation",
                "project_root": str(root / "project"),
                "active_slice": {"id": "home"},
                "input_artifact_refs": [str(root / "missing-approved.png")],
                "output_root": str(output_root),
                "expected_outputs": ["screenshots/home-mobile.png", "result-manifest.json"],
                "verification_expectations": ["screenshot evidence"],
                "allowed_side_effects": ["edit target page files"],
                "review_policy": {},
                "blocking_policy": {},
                "visual_contract": {"target_pages": ["/pages/home/index"], "pass_criteria": ["match source"]},
                "kanban_constraints": {"required": True},
            }), encoding="utf-8")
            digest_path.write_text(json.dumps({
                "schema": "active-slice-digest/v1",
                "task_id": "d2c-001",
                "capability": "visual_implementation",
                "handoff": {"result_manifest_path": str(output_root / "result-manifest.json")},
            }), encoding="utf-8")

            proc = subprocess.run(
                [sys.executable, str(SCRIPT), "--task", str(task_path), "--digest", str(digest_path), "--skip-running-check"],
                cwd=ROOT,
                text=True,
                capture_output=True,
                check=False,
            )
            self.assertNotEqual(proc.returncode, 0)
            self.assertIn("approved_visual_source", proc.stdout + proc.stderr)


if __name__ == "__main__":
    unittest.main()
