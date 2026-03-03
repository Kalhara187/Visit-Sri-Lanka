/**
 * Test script for Visit Sri Lanka backend API
 * Run with: node test-feedback.js
 * Make sure the server is running first: npm start
 */

const BASE_URL = 'http://localhost:5000/api';

async function testAPI() {
    console.log('=== Visit Sri Lanka Backend API Tests ===\n');

    // ---- Test Health Check ----
    await testEndpoint('Health Check', 'GET', '/health');

    // ---- Test Auth: Register ----
    const registerData = {
        fullName: 'Test User',
        email: `test${Date.now()}@example.com`,
        password: 'password123',
        confirmPassword: 'password123',
        phone: '0771234567',
        userType: 'traveler',
        acceptTerms: true
    };
    const registerResult = await testEndpoint('Register User', 'POST', '/auth/register', registerData);

    // ---- Test Auth: Login ----
    let token = '';
    const loginResult = await testEndpoint('Login User', 'POST', '/auth/login', {
        email: registerData.email,
        password: registerData.password
    });
    if (loginResult && loginResult.token) {
        token = loginResult.token;
        console.log('   Token acquired for protected routes\n');
    }

    // ---- Test Auth: Get Profile (protected) ----
    await testEndpoint('Get Profile (protected)', 'GET', '/auth/me', null, token);

    // ---- Test Feedback: Submit ----
    const ts = Date.now();
    await testEndpoint('Submit Feedback', 'POST', '/feedback', {
        fullName: 'Jane Doe',
        email: `jane${ts}@example.com`,
        rating: 5,
        category: 'tour',
        subject: 'compliment',
        message: `Amazing experience visiting Sri Lanka! (run ${ts})`
    });

    // ---- Test Feedback: Get All ----
    await testEndpoint('Get All Feedback', 'GET', '/feedback');

    // ---- Test Feedback: Get Stats ----
    await testEndpoint('Get Feedback Stats', 'GET', '/feedback/stats');

    // ---- Test Contact: Submit ----
    await testEndpoint('Submit Contact Message', 'POST', '/contact', {
        name: 'John Smith',
        email: 'john@example.com',
        subject: 'Inquiry about packages',
        message: 'I would like to know more about your tour packages.',
        phone: '0771234567'
    });

    // ---- Test Contact: Get All ----
    await testEndpoint('Get All Contacts', 'GET', '/contact');

    console.log('\n=== Tests Completed ===');
}

async function testEndpoint(name, method, path, body = null, token = '') {
    try {
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { Authorization: `Bearer ${token}` } : {})
            },
            ...(body ? { body: JSON.stringify(body) } : {})
        };

        const response = await fetch(`${BASE_URL}${path}`, options);
        const data = await response.json();

        const status = data.success ? '✅ PASS' : '❌ FAIL';
        console.log(`${status} [${method} ${path}] - ${name}`);
        if (!data.success) {
            console.log('   Error:', data.message);
        }
        return data;
    } catch (error) {
        console.log(`❌ ERROR [${method} ${path}] - ${name}: ${error.message}`);
        return null;
    }
}

testAPI();
