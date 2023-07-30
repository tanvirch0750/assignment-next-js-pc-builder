import Layout from '@/components/ui/Layout';
import { signIn } from 'next-auth/react';

function LoginPage() {
  return (
    <Layout>
      <section className="flex justify-center items-center h-screen mt-[-76px]">
        <div className="card w-96 bg-neutral text-neutral-content">
          <div className="card-body items-center text-center">
            <h2 className="card-title text-2xl">Login</h2>
            <p>Login with yout google account and build your pc</p>
            <div className="card-actions justify-center mt-2">
              <button
                onClick={() =>
                  signIn('google', {
                    callbackUrl: 'http://localhost:3000/pcBuilder',
                  })
                }
                className="btn btn-primary"
              >
                Login with google
              </button>
              <button
                onClick={() =>
                  signIn('github', {
                    callbackUrl: 'http://localhost:3000/pcBuilder',
                  })
                }
                className="btn btn-primary"
              >
                Login with Github
              </button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default LoginPage;
