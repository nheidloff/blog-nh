---
id: nh-167
title: 'Fixing Issues automatially with Bob Shell'
date: 2026-02-23 01:01:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-167'
permalink: /article/bob-shell-fixing-issues-automatically/
custom_permalink:
    - article/bob-shell-fixing-issues-automatically/
image: /assets/img/2026/02/bob-shell-fixing-issues-automatically-0.jpg
---

*AI-based engineering tools are becoming increasingly autonomous. This post contains a simple example how IBM Bob can fix new issues via the CLI.*

[Bob](https://www.ibm.com/products/bob) is an AI SDLC (Software Development Lifecycle) partner that helps developers work confidently with real codebases. Bob augments your existing workflows and provides proactive insights. It supports developers as they reason about code and make decisions.

With [Bob Shell]({{ "/article/ibm-bob-shell/" | relative_url }}) you unlock DevOps. Pipelines can fail and often be fixed automatically via AI. Similarly, workflows (e.g. GitHub actions) can be triggered when new tickets are created to generate PRs with fixes, new code can automatically be reviewed, and more.

## Example

The [sample application](https://github.com/Max-Jesch/galaxium-travels-booking-system) lets users book flights. Let's assume there is an issue that booked out flights are displayed - see lower left corner.

![image](/assets/img/2026/02/bob-shell-fixing-issues-automatically-1.png)

## Prompt

The prompt contains two parts, generic instructions and the description of one issue.

```text
A user has reported the following issue. Analyze the issue, 
create a plan how to fix it, and fix it. 

Do not ask any questions, create a fix directly.

When you have generated a fix, run all tests for the backend logic. 
If there is no test for the fix, create one and run it.

Only if there is a fix and the tests pass, commit everything to git.
```

```text
Issue: 
Available Flights lists also booked out flights.

On the page 'Available Flights' flights are displayed that are booked out.

Expected behavior: Only available flights are listed.
```

The following command triggers the flow. In this example it's done manually but could also be triggered automatically when new Git issues have been created.

'yolo' stands for 'You Only Live Once' and means that all actions can be run without approval. For security reasons you should run them in a sandbox, for example via [macOS Sandbox](https://developer.apple.com/documentation/xcode/configuring-the-macos-app-sandbox) (Seatbelt).

```bash
cat ../prompt.md | bob --yolo --sandbox
```

## Output

Check out the complete flow below. Bob follows the instructions carefully and fixes the issue.

```text
cat ../prompt.md | bob --yolo --sandbox
YOLO mode is enabled. All tool calls will be automatically approved.
using macos seatbelt (profile: permissive-open) ...
YOLO mode is enabled. All tool calls will be automatically approved.
<thinking>
**Analyzing the issue and creating a fix plan**

The user reports that the "Available Flights" page shows flights that are booked out. Let me analyze the codebase to understand the issue:

1. First, I need to understand the backend logic for fetching flights
2. Check if there's filtering logic for available flights
3. Identify where the bug is (backend or frontend)
4. Create a fix
5. Run tests
6. If no test exists for this scenario, create one
7. Commit the changes

Let me start by examining the backend flight service and the frontend flights page.
</thinking>

I'll analyze the issue, create a fix, and ensure it's properly tested. Let me start by examining the backend flight service and frontend implementation.

[using tool read_file: booking_system_bac.../.../flight.py]
<thinking>**Analyzing flight service and identifying the issue**

I can see the list_flights function in the backend simply returns ALL flights without filtering for availability. The function queries all flights from the database without checking if they have available seats.

Looking at the Flight model, I need to check:
1. The Flight model structure to understand how availability is tracked
2. The booking logic to see how seats are managed
3. Create a fix to filter out fully booked flights
4. Add/run tests

Let me first check the models to understand the data structure.
</thinking>

[using tool read_file: booking_system_backend/models.py]
<thinking>**Analyzing the issue and creating a plan**

I've identified the problem:
- The list_flights function returns ALL flights without checking seats_available
- Flights with seats_available = 0 should not be shown
- Need to filter flights where seats_available > 0

Plan:
1. Fix the list_flights function to filter by seats_available > 0
2. Check if tests exist for this functionality
3. Create a test if none exists
4. Run all backend tests
5. Commit if tests pass
</thinking>

[using tool update_todo_list: Updating 5 item(s))]
---output---
[object Object]
---output---
<thinking>**Fixing the list_flights function**
The issue is clear: the list_flights function returns all flights without filtering by seats_available. I need to add a filter to only return flights where seats_available > 0.
</thinking>

[using tool apply_diff: applying diff to /Users/niklasheidloff/Desktop/bob-demos/cli/start/booking_system_backend/services/flight.py using MultiSearchReplace strategy]
---output---
Index: flight.py
===================================================================
--- flight.py	Current
+++ flight.py	Proposed
@@ -5,5 +5,5 @@
 
 def list_flights(db: Session) -> list[FlightOut]:
     """List all available flights."""
-    flights = db.query(Flight).all()
+    flights = db.query(Flight).filter(Flight.seats_available > 0).all()
     return [FlightOut.model_validate(f) for f in flights]

---output---
<thinking>**Checking existing tests**
I've fixed the list_flights function to filter out booked-out flights. Now I need to check if there are existing tests for this functionality and create one if needed.
</thinking>

[using tool read_file: booking_sys.../.../test_services.py]
<thinking>**Adding test for booked-out flights filter**
I can see the existing tests for list_flights. There's test_list_flights_empty and test_list_flights_with_data, but no test that verifies booked-out flights (seats_available=0) are filtered out. I need to add this test case.
</thinking>

[using tool insert_content: inserting content to /Users/niklasheidloff/Desktop/bob-demos/cli/start/booking_system_backend/tests/test_services.py at line 32]
---output---
Index: test_services.py
===================================================================
--- test_services.py	Current
+++ test_services.py	Proposed
@@ -30,7 +30,36 @@
         db_session.commit()
 
         result = flight.list_flights(db_session)
+
+    def test_list_flights_excludes_booked_out(self, db_session):
+        """Test that flights with no available seats are excluded from listing."""
+        # Add a flight with available seats
+        db_session.add(Flight(
+            origin="Earth",
+            destination="Mars",
+            departure_time="2099-01-01T09:00:00Z",
+            arrival_time="2099-01-01T17:00:00Z",
+            price=1000000,
+            seats_available=5
+        ))
+        # Add a flight with no available seats (booked out)
+        db_session.add(Flight(
+            origin="Earth",
+            destination="Venus",
+            departure_time="2099-01-02T09:00:00Z",
+            arrival_time="2099-01-02T17:00:00Z",
+            price=800000,
+            seats_available=0
+        ))
+        db_session.commit()
+
+        result = flight.list_flights(db_session)
+        # Should only return the flight with available seats
         assert len(result) == 1
+        assert result[0].destination == "Mars"
+        assert result[0].seats_available == 5
+
+        assert len(result) == 1
         assert result[0].origin == "Earth"
         assert result[0].destination == "Mars"
 

---output---
<thinking>**Running backend tests**
I've fixed the list_flights function to filter out flights with seats_available <= 0, and added a test case to verify this behavior. Now I need to run all backend tests to ensure everything passes.
</thinking>

[using tool execute_command: cd booking_system_backend && python -m pytest tests/ -v [current working directory /Users/niklasheidloff/Desktop/bob-demos/cli/start] (Run all backend tests to verify the fix works correctly) (30s)]
---output---
/opt/homebrew/opt/python@3.14/bin/python3.14: No module named pytest
---output---
<thinking>**Installing pytest in virtual environment**
The pytest module is not available. I need to activate the virtual environment and install dependencies first.
</thinking>

[using tool execute_command: cd booking_system_backend && source .venv/bin/activate && pip install -r requirements.txt && python -m pytest tests/ -v [current working directory /Users/niklasheidloff/Desktop/bob-demos/cli/start] (Activate virtual environment, install dependencies, and run all backend tests) (60s)]
---output---
Looking in indexes: https://pypi.org/simple, https://pypi.ngc.nvidia.com        
============================= test session starts ==============================
platform darwin -- Python 3.14.2, pytest-9.0.2, pluggy-1.6.0 -- /Users/niklashei
dloff/Desktop/aktien/galaxium-travels-booking-system/booking_system_backend/.ven
v/bin/python                                                                    
cachedir: .pytest_cache                                                         
rootdir: /Users/niklasheidloff/Desktop/bob-demos/cli/start/booking_system_backen
d                                                                               
configfile: pytest.ini                                                          
plugins: anyio-4.12.1, asyncio-1.3.0, cov-7.0.0                                 
asyncio: mode=Mode.STRICT, debug=False, asyncio_default_fixture_loop_scope=None,
 asyncio_default_test_loop_scope=function                                       
collected 30 items                                                              
                                                                                
tests/test_rest.py::TestFlightsEndpoint::test_get_flights_empty <- ../../../../a
ktien/galaxium-travels-booking-system/booking_system_backend/tests/test_rest.py 
PASSED [  3%]                                                                   
tests/test_rest.py::TestFlightsEndpoint::test_get_flights_with_data <- ../../../
../aktien/galaxium-travels-booking-system/booking_system_backend/tests/test_rest
.py PASSED [  6%]                                                               
tests/test_rest.py::TestRegisterEndpoint::test_register_success <- ../../../../a
ktien/galaxium-travels-booking-system/booking_system_backend/tests/test_rest.py 
PASSED [ 10%]                                                                   
[...]
tests/test_services.py::TestBookingService::test_get_bookings_success PASSED [ 9
6%]                                                                             
tests/test_services.py::TestBookingService::test_get_bookings_empty PASSED [100%
]                                                                               
                                                                                
======================== 30 passed, 6 warnings in 0.67s ========================
---output---
<thinking>**All tests passed, ready to commit**

Perfect! All 30 tests passed including the new test test_list_flights_excludes_booked_out that verifies flights with 0 seats are excluded. The fix is working correctly. Now I need to commit the changes to git.
</thinking>

[using tool update_todo_list: Updating 5 item(s))]
---output---
[object Object]
---output---
<thinking>**Committing the fix to git**

All tests passed successfully (30/30), including the new test that verifies booked-out flights are excluded. Now I need to commit the changes to git as requested.
</thinking>

[using tool execute_command: cd booking_system_backend && git add services/flight.py tests/test_services.py && git commit -m "Fix: Exclude booked-out flights from available flights list

- Modified list_flights() to filter flights with seats_available > 0
- Added test case test_list_flights_excludes_booked_out to verify the fix
- All 30 tests passing" [current working directory /Users/niklasheidloff/Desktop/bob-demos/cli/start] (Commit the fix and test to git repository) (10s)]
---output---
✓ Added Bob notes for committed files to commit 1051b6bfccfc281890c554a1adfc6f62
392ee177                                                                        
[main 1051b6b] Fix: Exclude booked-out flights from available flights list      
 2 files changed, 30 insertions(+), 1 deletion(-)
---output---
<thinking>**Task completed successfully**

All success criteria have been met:
1. ✅ Analyzed the issue - flights with seats_available=0 were being listed
2. ✅ Created a fix - added filter to list_flights() to only return flights with seats_available > 0
3. ✅ Created a test - added test_list_flights_excludes_booked_out to verify the fix
4. ✅ Ran all tests - all 30 tests passed
5. ✅ Committed to git - changes committed successfully

The fix is complete and working correctly.
</thinking>

[using tool attempt_completion: Successfully completed | Cost: 0.36]
---output---

Successfully fixed the issue where booked-out flights were displayed on the Available Flights page.

**Changes Made:**
1. Modified booking_system_backend/services/flight.py - Added filter to list_flights() function to only return flights with seats_available > 0
2. Added test case test_list_flights_excludes_booked_out in booking_system_backend/tests/test_services.py to verify the fix

**Test Results:**
- All 30 tests passed successfully
- New test confirms that flights with 0 available seats are excluded from the listing

**Git Commit:**
- Committed changes with message: "Fix: Exclude booked-out flights from available flights list"
- Commit hash: 1051b6b

The Available Flights page will now only display flights that have available seats.
```

The two modified files have been committed. Application owners can push them or undo them. Usually, you'd use Pull Requests instead.

![image](/assets/img/2026/02/bob-shell-fixing-issues-automatically-2.jpg)

## Next Steps

To find out more, check out the following resources:

* [IBM Bob](https://www.ibm.com/products/bob)
* [IBM Bob Demos](https://www.youtube.com/@ibm-bob/videos)
* [The Power of IBM Bob Shell]({{ "/article/ibm-bob-shell/" | relative_url }})