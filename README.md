# IRCTC CI/CD Demo
### Based on Chapter 8 — *The Professional Scrum Master* by Fred Heath

This project demonstrates the full CI/CD pipeline as described in the book:
**Source Control → CI → Continuous Delivery → Continuous Deployment**

---

## Project Structure

```
cicd-demo/
├── app/
│   ├── index.js          # Express API (ticket booking)
│   └── server.js         # Server entry point
├── tests/
│   ├── unit.test.js      # Unit tests (CI Stage 1)
│   ├── api.test.js       # API/Service tests (CI Stage 2)
│   └── smoke.test.js     # Smoke tests (after staging deploy)
├── .github/
│   └── workflows/
│       └── ci-cd.yml     # GitHub Actions pipeline
└── package.json
```

---

## Demo Steps (Follow These During Presentation)

### Step 1 — Set Up (One Time)

```bash
# Clone your repo
git clone https://github.com/YOUR_USERNAME/irctc-cicd-demo
cd irctc-cicd-demo

# Install dependencies
npm install

# Run all tests locally
npm test
```

---

### Step 2 — Show Trunk-Based Development

```bash
# Create a feature branch (like "Alice" in the book's example)
git checkout -b feature/add-seat-number

# Make a small change — e.g., add seat number to the ticket
# Edit app/index.js: add seat field to the ticket object

# Commit your change
git add .
git commit -m "feat: add seat number to ticket booking"

# Push branch to GitHub
git push origin feature/add-seat-number
```

Now go to GitHub → open a **Pull Request** to `main`.
The pipeline triggers automatically. Show this to the audience.

---

### Step 3 — Watch CI Run

In GitHub → **Actions** tab, show the pipeline running:

1. ✅ **Unit Tests** run automatically
2. ✅ **API/Service Tests** run automatically
3. If both pass → merge the PR to `main`

**Demo Tip:** Before the live demo, break a test intentionally:
```js
// In unit.test.js, temporarily change:
expect(res.body.status).toBe('CONFIRMED');
// to:
expect(res.body.status).toBe('WRONG');
```
Push it, show the pipeline **fail** in red. Fix it, push again, show it go **green**.
This demonstrates the "constant feedback loop" the book describes.

---

### Step 4 — Show Continuous Delivery (Staging Deploy)

After CI passes on `main`, the pipeline automatically:
- Deploys to **staging**
- Runs **smoke tests** on staging

Point to the GitHub Actions log showing: *"Deploying to STAGING environment..."*

Book quote to mention: *"We get the benefit of having our increment automatically built
and running on an environment closely emulating the production environment."*

---

### Step 5 — Show Continuous Deployment (Production)

After staging passes, the pipeline deploys to **production** automatically.

Book quote to mention: *"Every change successfully deployed to staging is automatically
released to the stakeholders and customers."*

---

## Connect It to Scrum (Say This During Demo)

| CI/CD Concept | Scrum Connection |
|---|---|
| Feature branch merged to trunk | Sprint backlog item completed, merged at end of Sprint |
| Automated tests pass = DoD met | Definition of Done includes "integration-tested on staging" |
| Staging deploy | Increment is "potentially shippable" after each Sprint |
| Smoke tests after deploy | Verifies the Increment before Product Owner review |
| Production deploy | Product Owner approves release to stakeholders |

---

## Run Tests Individually

```bash
npm run test:unit     # Unit tests only
npm run test:api      # API/service tests only
npm run test:smoke    # Smoke tests only
npm test              # All tests
```

---

## Testing Levels Demonstrated (Chapter 8 Reference)

| Test File | Type | Book Definition |
|---|---|---|
| `unit.test.js` | Unit Testing | Tests a single unit of code (route handler) |
| `api.test.js` | API/Service Testing | Tests the interface between components |
| `smoke.test.js` | Smoke Testing | Quick check of basic functionality after deployment |
