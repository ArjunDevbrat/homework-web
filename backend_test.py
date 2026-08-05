#!/usr/bin/env python3
"""
Backend API Testing for HOMEWORK Coaching Platform
Tests /api/lead and /api/contact endpoints against the public preview URL
"""

import requests
import sys
from typing import Dict, Any, Tuple

# Public preview URL
BASE_URL = "https://fullstack-coach-app.preview.emergentagent.com"

class APITester:
    def __init__(self):
        self.tests_run = 0
        self.tests_passed = 0
        self.tests_failed = 0
        self.failures = []

    def test(self, name: str, method: str, endpoint: str, expected_status: int, 
             data: Any = None, headers: Dict[str, str] = None) -> Tuple[bool, Any]:
        """Run a single API test"""
        url = f"{BASE_URL}{endpoint}"
        if headers is None:
            headers = {'Content-Type': 'application/json'}
        
        self.tests_run += 1
        print(f"\n{'='*70}")
        print(f"TEST {self.tests_run}: {name}")
        print(f"{'='*70}")
        print(f"Method: {method} {endpoint}")
        
        try:
            if method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            elif method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            else:
                raise ValueError(f"Unsupported method: {method}")
            
            print(f"Expected Status: {expected_status}")
            print(f"Actual Status: {response.status_code}")
            
            # Try to parse JSON response
            try:
                response_data = response.json()
                print(f"Response: {response_data}")
            except Exception:
                response_data = response.text
                print(f"Response (text): {response_data[:200]}")
            
            success = response.status_code == expected_status
            
            if success:
                self.tests_passed += 1
                print(f"✅ PASSED")
            else:
                self.tests_failed += 1
                self.failures.append({
                    'test': name,
                    'expected': expected_status,
                    'actual': response.status_code,
                    'response': response_data
                })
                print(f"❌ FAILED - Expected {expected_status}, got {response.status_code}")
            
            return success, response_data
            
        except Exception as e:
            self.tests_failed += 1
            self.failures.append({
                'test': name,
                'error': str(e)
            })
            print(f"❌ FAILED - Exception: {str(e)}")
            return False, None

    def print_summary(self):
        """Print test summary"""
        print(f"\n{'='*70}")
        print(f"TEST SUMMARY")
        print(f"{'='*70}")
        print(f"Total Tests: {self.tests_run}")
        print(f"Passed: {self.tests_passed} ✅")
        print(f"Failed: {self.tests_failed} ❌")
        print(f"Success Rate: {(self.tests_passed/self.tests_run*100):.1f}%")
        
        if self.failures:
            print(f"\n{'='*70}")
            print(f"FAILURES DETAIL")
            print(f"{'='*70}")
            for i, failure in enumerate(self.failures, 1):
                print(f"\n{i}. {failure.get('test', 'Unknown')}")
                if 'error' in failure:
                    print(f"   Error: {failure['error']}")
                else:
                    print(f"   Expected: {failure.get('expected')}")
                    print(f"   Actual: {failure.get('actual')}")
                    print(f"   Response: {failure.get('response')}")


def main():
    tester = APITester()
    
    print("="*70)
    print("HOMEWORK COACHING PLATFORM - BACKEND API TESTS")
    print("="*70)
    print(f"Testing against: {BASE_URL}")
    
    # ========================================================================
    # TEST GROUP 1: /api/lead endpoint
    # ========================================================================
    
    print("\n\n" + "="*70)
    print("TEST GROUP 1: /api/lead - Consultation Lead Endpoint")
    print("="*70)
    
    # Test 1: Valid lead submission
    valid_lead = {
        "fullName": "Test User",
        "email": "test@example.com",
        "phone": "+91 9876543210",
        "goal": "FAT_LOSS",
        "programSlug": "foundation-12",
        "notes": "Looking forward to starting my fitness journey",
        "consent": True
    }
    success, response = tester.test(
        "Valid lead submission",
        "POST",
        "/api/lead",
        201,
        data=valid_lead
    )
    
    # Verify response structure
    if success and response:
        if response.get('status') == 'success' and 'id' in response and 'emailDelivered' in response:
            print("✅ Response structure is correct")
            if response.get('emailDelivered') == False:
                print("✅ emailDelivered is False as expected (Resend not configured)")
        else:
            print("❌ Response structure is incorrect")
            tester.failures.append({
                'test': 'Valid lead response structure',
                'issue': 'Missing required fields in response'
            })
    
    # Test 2: Lead with missing required fields
    invalid_lead_missing = {
        "fullName": "Test User",
        "email": "test@example.com"
        # Missing phone, goal, consent
    }
    success, response = tester.test(
        "Lead with missing required fields",
        "POST",
        "/api/lead",
        422,
        data=invalid_lead_missing
    )
    
    if success and response:
        if 'fieldErrors' in response:
            print("✅ fieldErrors present in response")
            if 'phone' in response['fieldErrors'] and 'goal' in response['fieldErrors'] and 'consent' in response['fieldErrors']:
                print("✅ All missing fields reported in fieldErrors")
            else:
                print(f"⚠️  Some missing fields not reported: {response['fieldErrors']}")
        else:
            print("❌ fieldErrors not present in response")
    
    # Test 3: Lead with invalid email
    invalid_lead_email = {
        "fullName": "Test User",
        "email": "not-an-email",
        "phone": "+91 9876543210",
        "goal": "FAT_LOSS",
        "consent": True
    }
    success, response = tester.test(
        "Lead with invalid email",
        "POST",
        "/api/lead",
        422,
        data=invalid_lead_email
    )
    
    if success and response:
        if 'fieldErrors' in response and 'email' in response['fieldErrors']:
            print("✅ Email validation error reported correctly")
    
    # Test 4: Lead with invalid phone
    invalid_lead_phone = {
        "fullName": "Test User",
        "email": "test@example.com",
        "phone": "123",  # Too short
        "goal": "FAT_LOSS",
        "consent": True
    }
    success, response = tester.test(
        "Lead with invalid phone",
        "POST",
        "/api/lead",
        422,
        data=invalid_lead_phone
    )
    
    if success and response:
        if 'fieldErrors' in response and 'phone' in response['fieldErrors']:
            print("✅ Phone validation error reported correctly")
    
    # Test 5: Lead with consent=false
    invalid_lead_consent = {
        "fullName": "Test User",
        "email": "test@example.com",
        "phone": "+91 9876543210",
        "goal": "FAT_LOSS",
        "consent": False
    }
    success, response = tester.test(
        "Lead with consent=false",
        "POST",
        "/api/lead",
        422,
        data=invalid_lead_consent
    )
    
    if success and response:
        if 'fieldErrors' in response and 'consent' in response['fieldErrors']:
            print("✅ Consent validation error reported correctly")
    
    # Test 6: Lead with malformed JSON
    print(f"\n{'='*70}")
    print(f"TEST {tester.tests_run + 1}: Lead with malformed JSON")
    print(f"{'='*70}")
    try:
        response = requests.post(
            f"{BASE_URL}/api/lead",
            data="not valid json",
            headers={'Content-Type': 'application/json'},
            timeout=10
        )
        tester.tests_run += 1
        print(f"Expected Status: 400")
        print(f"Actual Status: {response.status_code}")
        
        if response.status_code == 400:
            tester.tests_passed += 1
            print("✅ PASSED - Malformed JSON rejected with 400")
        else:
            tester.tests_failed += 1
            tester.failures.append({
                'test': 'Lead with malformed JSON',
                'expected': 400,
                'actual': response.status_code
            })
            print(f"❌ FAILED - Expected 400, got {response.status_code}")
    except Exception as e:
        tester.tests_failed += 1
        print(f"❌ FAILED - Exception: {str(e)}")
    
    # ========================================================================
    # TEST GROUP 2: /api/contact endpoint
    # ========================================================================
    
    print("\n\n" + "="*70)
    print("TEST GROUP 2: /api/contact - General Enquiry Endpoint")
    print("="*70)
    
    # Test 7: Valid contact submission
    valid_contact = {
        "fullName": "Test User",
        "email": "test@example.com",
        "subject": "General Enquiry",
        "message": "I would like to know more about your coaching programs and how they work."
    }
    success, response = tester.test(
        "Valid contact submission",
        "POST",
        "/api/contact",
        201,
        data=valid_contact
    )
    
    if success and response:
        if response.get('status') == 'success' and 'id' in response:
            print("✅ Response structure is correct")
    
    # Test 8: Contact with missing required fields
    invalid_contact_missing = {
        "fullName": "Test User",
        "email": "test@example.com"
        # Missing subject and message
    }
    success, response = tester.test(
        "Contact with missing required fields",
        "POST",
        "/api/contact",
        422,
        data=invalid_contact_missing
    )
    
    if success and response:
        if 'fieldErrors' in response:
            print("✅ fieldErrors present in response")
            if 'subject' in response['fieldErrors'] and 'message' in response['fieldErrors']:
                print("✅ All missing fields reported in fieldErrors")
    
    # Test 9: Contact with invalid email
    invalid_contact_email = {
        "fullName": "Test User",
        "email": "invalid-email",
        "subject": "Test Subject",
        "message": "This is a test message with at least 10 characters."
    }
    success, response = tester.test(
        "Contact with invalid email",
        "POST",
        "/api/contact",
        422,
        data=invalid_contact_email
    )
    
    if success and response:
        if 'fieldErrors' in response and 'email' in response['fieldErrors']:
            print("✅ Email validation error reported correctly")
    
    # Test 10: Contact with short message
    invalid_contact_short = {
        "fullName": "Test User",
        "email": "test@example.com",
        "subject": "Test",
        "message": "Short"  # Less than 10 characters
    }
    success, response = tester.test(
        "Contact with short message",
        "POST",
        "/api/contact",
        422,
        data=invalid_contact_short
    )
    
    if success and response:
        if 'fieldErrors' in response and 'message' in response['fieldErrors']:
            print("✅ Message length validation error reported correctly")
    
    # Test 11: Contact with malformed JSON
    print(f"\n{'='*70}")
    print(f"TEST {tester.tests_run + 1}: Contact with malformed JSON")
    print(f"{'='*70}")
    try:
        response = requests.post(
            f"{BASE_URL}/api/contact",
            data="not valid json",
            headers={'Content-Type': 'application/json'},
            timeout=10
        )
        tester.tests_run += 1
        print(f"Expected Status: 400")
        print(f"Actual Status: {response.status_code}")
        
        if response.status_code == 400:
            tester.tests_passed += 1
            print("✅ PASSED - Malformed JSON rejected with 400")
        else:
            tester.tests_failed += 1
            tester.failures.append({
                'test': 'Contact with malformed JSON',
                'expected': 400,
                'actual': response.status_code
            })
            print(f"❌ FAILED - Expected 400, got {response.status_code}")
    except Exception as e:
        tester.tests_failed += 1
        print(f"❌ FAILED - Exception: {str(e)}")
    
    # Print summary
    tester.print_summary()
    
    # Return exit code
    return 0 if tester.tests_failed == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
