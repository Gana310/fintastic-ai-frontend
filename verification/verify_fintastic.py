from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        # 1. Home Page
        print("Navigating to Home...")
        page.goto("http://localhost:5173/")
        page.screenshot(path="verification/1_home.png")
        print("Home screenshot taken.")

        # 2. Start Onboarding
        print("Clicking Get Started...")
        # There might be two "Get Started" buttons (Header and Hero). Take the first one.
        page.get_by_text("Get Started").first.click()
        page.wait_for_url("**/onboarding")
        page.screenshot(path="verification/2_onboarding_step1.png")

        # 3. Fill Questionnaire
        print("Filling Step 1 (Short Term Goals)...")
        page.get_by_text("Trading", exact=True).click()
        page.get_by_role("button", name="Next Step").click()

        print("Filling Step 2 (Long Term Goals)...")
        page.get_by_text("Retirement", exact=True).click()
        page.get_by_role("button", name="Next Step").click()

        print("Filling Step 3 (Financial Situation)...")
        page.fill("input[id='monthlyContribution']", "1000")
        page.fill("input[id='currentSavings']", "50000")
        page.get_by_role("button", name="Next Step").click()

        print("Filling Step 4 (Risk Tolerance)...")
        # Use first because options might be repeated or hidden
        page.get_by_text("Moderate", exact=True).click()
        page.get_by_text("Intermediate", exact=True).click()
        page.get_by_text("Medium Term", exact=False).click() # Medium Term (3-7 years)

        # Take screenshot before submitting
        page.screenshot(path="verification/3_onboarding_step4.png")

        print("Submitting Profile...")
        page.get_by_role("button", name="Complete Profile").click()
        # Wait for navigation to analysis
        page.wait_for_url("**/analysis")

        # 4. Analysis Page (Empty)
        print("Navigating to Analysis...")
        page.screenshot(path="verification/4_analysis_empty.png")

        # 5. Perform Search
        print("Searching for AAPL...")
        page.fill("input[type='text']", "AAPL")
        page.get_by_role("button", name="Analyze").click()

        # Wait for results (mock delay is 1000ms)
        print("Waiting for results...")
        # Wait for "Financial Health Index" text to appear
        page.wait_for_selector("text=Financial Health Index", timeout=10000)

        # Take final screenshot
        page.screenshot(path="verification/5_analysis_results.png")
        print("Final results screenshot taken.")

    except Exception as e:
        print(f"Error: {e}")
        page.screenshot(path="verification/error.png")
    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)
