import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend, Rate } from 'k6/metrics';

const BASE_URL = 'https://tfg-recommender-backend.fly.dev';

const responseTime = new Trend('response_time');
const errorRate    = new Rate('error_rate');

export const options = {
  stages: [
    { duration: '30s', target: 10 },
    { duration: '1m',  target: 10 },
    { duration: '30s', target: 50 },
    { duration: '30s', target: 0  },
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000'],
    error_rate:        ['rate<0.05'],
  },
};

export default function () {
  const health = http.get(`${BASE_URL}/`);
  check(health, { 'health 200': (r) => r.status === 200 });
  responseTime.add(health.timings.duration);
  errorRate.add(health.status !== 200);

  const recs = http.get(`${BASE_URL}/recommendations`);
  check(recs, { 'recommendations 200': (r) => r.status === 200 });
  responseTime.add(recs.timings.duration);
  errorRate.add(recs.status !== 200);

  sleep(1);
}
