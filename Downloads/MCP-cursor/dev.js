const { spawn } = require('child_process');
const path = require('path');

// Start FastAPI server
const apiProcess = spawn('python', ['-m', 'uvicorn', 'api.index:app', '--reload', '--port', '8000'], {
  stdio: 'inherit',
  shell: true
});

// Start Next.js development server
const nextProcess = spawn('npm', ['run', 'dev'], {
  stdio: 'inherit',
  shell: true
});

// Handle exit
process.on('SIGINT', () => {
  console.log('Shutting down development servers...');
  apiProcess.kill('SIGINT');
  nextProcess.kill('SIGINT');
  process.exit(0);
});

console.log('Development servers started:');
console.log('- Next.js: http://localhost:3000');
console.log('- FastAPI: http://localhost:8000');
console.log('Press Ctrl+C to stop both servers.');

// Handle process errors
apiProcess.on('error', (err) => {
  console.error('Failed to start FastAPI server:', err);
});

nextProcess.on('error', (err) => {
  console.error('Failed to start Next.js server:', err);
});

// Handle process exit
apiProcess.on('exit', (code) => {
  if (code !== 0) {
    console.error(`FastAPI server exited with code ${code}`);
  }
  nextProcess.kill('SIGINT');
  process.exit(code);
});

nextProcess.on('exit', (code) => {
  if (code !== 0) {
    console.error(`Next.js server exited with code ${code}`);
  }
  apiProcess.kill('SIGINT');
  process.exit(code);
});
