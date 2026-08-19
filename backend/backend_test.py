#!/usr/bin/env python3
"""
Backend API test suite for HOMEWORK platform Phase 2.
Tests POST /api/lead and POST /api/contact endpoints.
"""

import requests
import sys
from datetime import datetime

class HomeworkAPITester:
    def __init__(self, base_url="https://hw-assessment.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}{endpoint}"
        if headers is None:
            headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Test {self.tests_run}: {name}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            else:
                raise ValueError(f"Unsupported method: {method}")

            success = response.status_code == expected_status
            
            if success:
                self.tests_passed += 1
                print(f"✅ PASSED - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"   Response: {response_data}")
                    return True, response_data
                except Exception:
                    return True, {}
            else:
                print(f"❌ FAILED - Expected {expected_status}, got {response.status_code}")
                try:
                    error_data = response.json()
                    print(f"   Error response: {error_data}")
                except Exception:
                    print(f"   Response text: {response.text[:200]}")
                self.failed_tests.append(name)
                return False, {}

        except Exception as e:
            print(f"❌ FAILED - Exception: {str(e)}")
            self.failed_tests.append(name)
            return False, {}

    def test_lead_api_valid_submission(self):
        """Test POST /api/lead with valid data"""
        timestamp = datetime.now().strftime('%H%M%S')
        data = {
            "fullName": f"Test User {timestamp}",
            "phone": "+919876543210",
            "age": 31,
            "gender": "FEMALE",
            "goal": "FAT_LOSS",
            "healthIssue": "None, just want to lose weight",
            "profession": "Software Engineer",
            "email": f"test{timestamp}@example.com",
            "programSlug": "holistic-health",
            "consent": True
        }
        
        success, response = self.run_test(
            "POST /api/lead - Valid submission",
            "POST",
            "/api/lead",
            201,
            data=data
        )
        
        if success:
            # Verify response structure
            if 'status' in response and response['status'] == 'success':
                print("   ✓ Response has correct status")
            if 'id' in response:
                print("   ✓ Response contains lead ID")
            if 'emailDelivered' in response:
                print(f"   ✓ emailDelivered: {response['emailDelivered']} (false is expected)")
            if 'whatsappUrl' in response:
                print(f"   ✓ WhatsApp URL generated: {response['whatsappUrl'][:50]}...")
        
        return success

    def test_lead_api_missing_required_fields(self):
        """Test POST /api/lead with missing required fields"""
        data = {
            "fullName": "Test User",
            "phone": "+919876543210",
            # Missing: age, gender, goal, healthIssue, profession, consent
        }
        
        success, response = self.run_test(
            "POST /api/lead - Missing required fields (should return 422)",
            "POST",
            "/api/lead",
            422,
            data=data
        )
        
        if success and 'fieldErrors' in response:
            print(f"   ✓ Field errors returned: {list(response['fieldErrors'].keys())}")
        
        return success

    def test_lead_api_invalid_age(self):
        """Test POST /api/lead with invalid age (below 14)"""
        data = {
            "fullName": "Young User",
            "phone": "+919876543210",
            "age": 10,
            "gender": "MALE",
            "goal": "MUSCLE_BUILDING",
            "healthIssue": "None",
            "profession": "Student",
            "consent": True
        }
        
        success, response = self.run_test(
            "POST /api/lead - Age below 14 (should return 422)",
            "POST",
            "/api/lead",
            422,
            data=data
        )
        
        if success and 'fieldErrors' in response and 'age' in response['fieldErrors']:
            print(f"   ✓ Age validation error: {response['fieldErrors']['age']}")
        
        return success

    def test_lead_api_invalid_age_above_95(self):
        """Test POST /api/lead with invalid age (above 95)"""
        data = {
            "fullName": "Senior User",
            "phone": "+919876543210",
            "age": 100,
            "gender": "FEMALE",
            "goal": "HEALTHY_AGING",
            "healthIssue": "None",
            "profession": "Retired",
            "consent": True
        }
        
        success, response = self.run_test(
            "POST /api/lead - Age above 95 (should return 422)",
            "POST",
            "/api/lead",
            422,
            data=data
        )
        
        if success and 'fieldErrors' in response and 'age' in response['fieldErrors']:
            print(f"   ✓ Age validation error: {response['fieldErrors']['age']}")
        
        return success

    def test_lead_api_invalid_phone(self):
        """Test POST /api/lead with invalid phone (too short)"""
        data = {
            "fullName": "Test User",
            "phone": "123",
            "age": 30,
            "gender": "MALE",
            "goal": "FAT_LOSS",
            "healthIssue": "None",
            "profession": "Engineer",
            "consent": True
        }
        
        success, response = self.run_test(
            "POST /api/lead - Invalid phone (should return 422)",
            "POST",
            "/api/lead",
            422,
            data=data
        )
        
        if success and 'fieldErrors' in response and 'phone' in response['fieldErrors']:
            print(f"   ✓ Phone validation error: {response['fieldErrors']['phone']}")
        
        return success

    def test_lead_api_invalid_health_issue(self):
        """Test POST /api/lead with health issue under 3 chars"""
        data = {
            "fullName": "Test User",
            "phone": "+919876543210",
            "age": 30,
            "gender": "MALE",
            "goal": "FAT_LOSS",
            "healthIssue": "No",
            "profession": "Engineer",
            "consent": True
        }
        
        success, response = self.run_test(
            "POST /api/lead - Health issue under 3 chars (should return 422)",
            "POST",
            "/api/lead",
            422,
            data=data
        )
        
        if success and 'fieldErrors' in response and 'healthIssue' in response['fieldErrors']:
            print(f"   ✓ Health issue validation error: {response['fieldErrors']['healthIssue']}")
        
        return success

    def test_lead_api_malformed_json(self):
        """Test POST /api/lead with malformed JSON"""
        url = f"{self.base_url}/api/lead"
        self.tests_run += 1
        print(f"\n🔍 Test {self.tests_run}: POST /api/lead - Malformed JSON (should return 400)")
        
        try:
            response = requests.post(
                url,
                data="not valid json",
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            if response.status_code == 400:
                self.tests_passed += 1
                print(f"✅ PASSED - Status: {response.status_code}")
                return True
            else:
                print(f"❌ FAILED - Expected 400, got {response.status_code}")
                self.failed_tests.append("POST /api/lead - Malformed JSON")
                return False
        except Exception as e:
            print(f"❌ FAILED - Exception: {str(e)}")
            self.failed_tests.append("POST /api/lead - Malformed JSON")
            return False

    def test_contact_api_valid_submission(self):
        """Test POST /api/contact with valid data"""
        timestamp = datetime.now().strftime('%H%M%S')
        data = {
            "fullName": f"Contact Test {timestamp}",
            "email": f"contact{timestamp}@example.com",
            "subject": "Test enquiry about programs",
            "message": "This is a test message to verify the contact API is working correctly."
        }
        
        success, response = self.run_test(
            "POST /api/contact - Valid submission",
            "POST",
            "/api/contact",
            201,
            data=data
        )
        
        if success:
            if 'status' in response and response['status'] == 'success':
                print("   ✓ Response has correct status")
            if 'id' in response:
                print("   ✓ Response contains submission ID")
            if 'emailDelivered' in response:
                print(f"   ✓ emailDelivered: {response['emailDelivered']}")
        
        return success

    def test_contact_api_missing_fields(self):
        """Test POST /api/contact with missing required fields"""
        data = {
            "fullName": "Test User",
            # Missing: email, subject, message
        }
        
        success, response = self.run_test(
            "POST /api/contact - Missing required fields (should return 422)",
            "POST",
            "/api/contact",
            422,
            data=data
        )
        
        if success and 'fieldErrors' in response:
            print(f"   ✓ Field errors returned: {list(response['fieldErrors'].keys())}")
        
        return success

    def test_contact_api_invalid_email(self):
        """Test POST /api/contact with invalid email"""
        data = {
            "fullName": "Test User",
            "email": "not-an-email",
            "subject": "Test subject",
            "message": "This is a test message with invalid email."
        }
        
        success, response = self.run_test(
            "POST /api/contact - Invalid email (should return 422)",
            "POST",
            "/api/contact",
            422,
            data=data
        )
        
        if success and 'fieldErrors' in response and 'email' in response['fieldErrors']:
            print(f"   ✓ Email validation error: {response['fieldErrors']['email']}")
        
        return success

    def test_contact_api_message_too_short(self):
        """Test POST /api/contact with message under 10 chars"""
        data = {
            "fullName": "Test User",
            "email": "test@example.com",
            "subject": "Test",
            "message": "Short"
        }
        
        success, response = self.run_test(
            "POST /api/contact - Message too short (should return 422)",
            "POST",
            "/api/contact",
            422,
            data=data
        )
        
        if success and 'fieldErrors' in response and 'message' in response['fieldErrors']:
            print(f"   ✓ Message validation error: {response['fieldErrors']['message']}")
        
        return success

    def print_summary(self):
        """Print test summary"""
        print("\n" + "="*70)
        print("📊 TEST SUMMARY")
        print("="*70)
        print(f"Total tests run: {self.tests_run}")
        print(f"Tests passed: {self.tests_passed}")
        print(f"Tests failed: {self.tests_run - self.tests_passed}")
        print(f"Success rate: {(self.tests_passed/self.tests_run*100):.1f}%")
        
        if self.failed_tests:
            print("\n❌ Failed tests:")
            for test in self.failed_tests:
                print(f"   - {test}")
        else:
            print("\n✅ All tests passed!")
        
        print("="*70)
        
        return 0 if len(self.failed_tests) == 0 else 1

def main():
    print("="*70)
    print("HOMEWORK Platform - Backend API Test Suite (Phase 2)")
    print("="*70)
    
    tester = HomeworkAPITester()
    
    # Test POST /api/lead
    print("\n" + "="*70)
    print("Testing POST /api/lead")
    print("="*70)
    
    tester.test_lead_api_valid_submission()
    tester.test_lead_api_missing_required_fields()
    tester.test_lead_api_invalid_age()
    tester.test_lead_api_invalid_age_above_95()
    tester.test_lead_api_invalid_phone()
    tester.test_lead_api_invalid_health_issue()
    tester.test_lead_api_malformed_json()
    
    # Test POST /api/contact
    print("\n" + "="*70)
    print("Testing POST /api/contact")
    print("="*70)
    
    tester.test_contact_api_valid_submission()
    tester.test_contact_api_missing_fields()
    tester.test_contact_api_invalid_email()
    tester.test_contact_api_message_too_short()
    
    # Print summary
    return tester.print_summary()

if __name__ == "__main__":
    sys.exit(main())
