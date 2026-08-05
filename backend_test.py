#!/usr/bin/env python3
"""
Backend API Test Suite for HOMEWORK Coaching Platform
Tests all API endpoints via the public preview URL
"""

import requests
import sys
from datetime import datetime

class APITester:
    def __init__(self, base_url="https://fullstack-coach-app.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_test(self, name, passed, details=""):
        """Log test result"""
        self.tests_run += 1
        if passed:
            self.tests_passed += 1
            print(f"✅ PASS: {name}")
        else:
            print(f"❌ FAIL: {name}")
        if details:
            print(f"   {details}")
        self.test_results.append({"name": name, "passed": passed, "details": details})

    def test_lead_api_valid(self):
        """Test POST /api/lead with valid data"""
        url = f"{self.base_url}/api/lead"
        timestamp = datetime.now().strftime("%H%M%S")
        payload = {
            "fullName": f"Backend Test {timestamp}",
            "email": f"backend-test-{timestamp}@example.com",
            "phone": "+91 9876543210",
            "goal": "FAT_LOSS",
            "programSlug": "foundation-12",
            "notes": "Automated backend test",
            "consent": True
        }
        
        try:
            response = requests.post(url, json=payload, timeout=10)
            passed = (
                response.status_code == 201 and
                response.json().get("status") == "success" and
                "id" in response.json() and
                response.json().get("emailDelivered") == False
            )
            self.log_test(
                "POST /api/lead (valid data)",
                passed,
                f"Status: {response.status_code}, Response: {response.json()}"
            )
            return passed
        except Exception as e:
            self.log_test("POST /api/lead (valid data)", False, f"Error: {str(e)}")
            return False

    def test_lead_api_invalid(self):
        """Test POST /api/lead with invalid data (missing required fields)"""
        url = f"{self.base_url}/api/lead"
        payload = {}
        
        try:
            response = requests.post(url, json=payload, timeout=10)
            passed = (
                response.status_code == 422 and
                response.json().get("status") == "error" and
                "fieldErrors" in response.json()
            )
            field_errors = response.json().get("fieldErrors", {})
            has_required_errors = all(
                key in field_errors 
                for key in ["fullName", "email", "phone", "goal", "consent"]
            )
            passed = passed and has_required_errors
            self.log_test(
                "POST /api/lead (validation errors)",
                passed,
                f"Status: {response.status_code}, Errors: {list(field_errors.keys())}"
            )
            return passed
        except Exception as e:
            self.log_test("POST /api/lead (validation errors)", False, f"Error: {str(e)}")
            return False

    def test_lead_api_malformed_json(self):
        """Test POST /api/lead with malformed JSON"""
        url = f"{self.base_url}/api/lead"
        
        try:
            response = requests.post(
                url, 
                data="invalid json", 
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            passed = (
                response.status_code == 400 and
                response.json().get("message") == "Invalid JSON body"
            )
            self.log_test(
                "POST /api/lead (malformed JSON)",
                passed,
                f"Status: {response.status_code}"
            )
            return passed
        except Exception as e:
            self.log_test("POST /api/lead (malformed JSON)", False, f"Error: {str(e)}")
            return False

    def test_contact_api_valid(self):
        """Test POST /api/contact with valid data"""
        url = f"{self.base_url}/api/contact"
        timestamp = datetime.now().strftime("%H%M%S")
        payload = {
            "fullName": f"Backend Contact Test {timestamp}",
            "email": f"backend-contact-{timestamp}@example.com",
            "subject": "Automated test subject",
            "message": "This is an automated test message for the contact API endpoint."
        }
        
        try:
            response = requests.post(url, json=payload, timeout=10)
            passed = (
                response.status_code == 201 and
                response.json().get("status") == "success" and
                "id" in response.json() and
                response.json().get("emailDelivered") == False
            )
            self.log_test(
                "POST /api/contact (valid data)",
                passed,
                f"Status: {response.status_code}, Response: {response.json()}"
            )
            return passed
        except Exception as e:
            self.log_test("POST /api/contact (valid data)", False, f"Error: {str(e)}")
            return False

    def test_contact_api_invalid(self):
        """Test POST /api/contact with invalid data"""
        url = f"{self.base_url}/api/contact"
        payload = {"fullName": "A"}  # Too short, missing other required fields
        
        try:
            response = requests.post(url, json=payload, timeout=10)
            passed = (
                response.status_code == 422 and
                response.json().get("status") == "error" and
                "fieldErrors" in response.json()
            )
            field_errors = response.json().get("fieldErrors", {})
            has_required_errors = all(
                key in field_errors 
                for key in ["fullName", "email", "subject", "message"]
            )
            passed = passed and has_required_errors
            self.log_test(
                "POST /api/contact (validation errors)",
                passed,
                f"Status: {response.status_code}, Errors: {list(field_errors.keys())}"
            )
            return passed
        except Exception as e:
            self.log_test("POST /api/contact (validation errors)", False, f"Error: {str(e)}")
            return False

    def test_phone_validation(self):
        """Test phone number validation"""
        url = f"{self.base_url}/api/lead"
        timestamp = datetime.now().strftime("%H%M%S")
        payload = {
            "fullName": "Phone Test",
            "email": f"phone-test-{timestamp}@example.com",
            "phone": "123",  # Too short
            "goal": "FAT_LOSS",
            "consent": True
        }
        
        try:
            response = requests.post(url, json=payload, timeout=10)
            passed = (
                response.status_code == 422 and
                "phone" in response.json().get("fieldErrors", {})
            )
            self.log_test(
                "Phone validation (too short)",
                passed,
                f"Status: {response.status_code}"
            )
            return passed
        except Exception as e:
            self.log_test("Phone validation (too short)", False, f"Error: {str(e)}")
            return False

    def test_email_validation(self):
        """Test email validation"""
        url = f"{self.base_url}/api/lead"
        payload = {
            "fullName": "Email Test",
            "email": "invalid-email",
            "phone": "+91 9876543210",
            "goal": "FAT_LOSS",
            "consent": True
        }
        
        try:
            response = requests.post(url, json=payload, timeout=10)
            passed = (
                response.status_code == 422 and
                "email" in response.json().get("fieldErrors", {})
            )
            self.log_test(
                "Email validation (invalid format)",
                passed,
                f"Status: {response.status_code}"
            )
            return passed
        except Exception as e:
            self.log_test("Email validation (invalid format)", False, f"Error: {str(e)}")
            return False

    def run_all_tests(self):
        """Run all backend API tests"""
        print("=" * 70)
        print("HOMEWORK COACHING PLATFORM - BACKEND API TEST SUITE")
        print("=" * 70)
        print(f"Testing against: {self.base_url}")
        print()

        # Run all tests
        self.test_lead_api_valid()
        self.test_lead_api_invalid()
        self.test_lead_api_malformed_json()
        self.test_contact_api_valid()
        self.test_contact_api_invalid()
        self.test_phone_validation()
        self.test_email_validation()

        # Print summary
        print()
        print("=" * 70)
        print(f"RESULTS: {self.tests_passed}/{self.tests_run} tests passed")
        print("=" * 70)
        
        return 0 if self.tests_passed == self.tests_run else 1


def main():
    tester = APITester()
    exit_code = tester.run_all_tests()
    sys.exit(exit_code)


if __name__ == "__main__":
    main()
