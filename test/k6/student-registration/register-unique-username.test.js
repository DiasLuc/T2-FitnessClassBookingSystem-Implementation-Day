import http from 'k6/http';
import { check } from 'k6';
import { BASE_URL } from '../baseUrl.js';

export const options = {
  vus: 30, // 30 virtual users
  duration: '60s',
  thresholds: {
    http_req_duration: ['p(95)<200'], // 95% of requests must complete below 200ms
  },
};

export default function () {
  const timestamp = Date.now();
  const username = `user_${timestamp}_${__VU}_${__ITER}`;
  const payload = JSON.stringify({
    username: username,
    password: 'ValidPassword123!',
    email: `${username}@example.com`,
    // Add other required fields if needed
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(`${BASE_URL}/api/students/register`, payload, params);

  check(res, {
    'status is 200': (r) => r.status === 200,
    'response has student': (r) => r.json('student.username') === username,
  });
}
