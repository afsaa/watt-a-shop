import { Button } from '@/components';
import { useAppStore } from '@/store';
import { useNavigate } from 'react-router-dom';

const SignIn = (): JSX.Element => {
  const navigate = useNavigate();
  const setIsUserLoggedIn = useAppStore((state) => state.setIsUserLoggedIn);
  const storedUser = JSON.parse(localStorage.getItem('user') || '{}');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (storedUser.email) {
      // Send the form data to the server for authentication.
      // If the authentication is successful, set the user as logged in and store the user
      if (formData.get('email') !== storedUser?.email || formData.get('password') !== storedUser?.password) {
        alert('Invalid email or password');
        return;
      }

      setIsUserLoggedIn(true);
      // Redirect the user to the home page
      navigate('/');
      return;
    }

    const newUser = { name: formData.get('name'), email: formData.get('email'), password: formData.get('password') };
    localStorage.setItem('user', JSON.stringify(newUser));
    navigate('/');
  };

  const renderSignIn = () => {
    return (
      <section className="w-full flex flex-col justify-center items-center">
        <h1 className="text-3xl dark:text-white">Sign In</h1>
        <form className="w-1/3 flex flex-col justify-center items-start gap-4" onSubmit={handleSubmit}>
          <div className="w-full flex flex-col">
            <label className="mb-2 text-lg dark:text-white font-semibold" htmlFor="email">
              Email
            </label>
            <input
              className="py-4 px-2 rounded-md outline-none ring-1 focus:ring-2 dark:ring-white ring-black dark:bg-transparent dark:text-white"
              type="email"
              id="email"
              name="email"
              placeholder="customer@gmail.com"
            />
          </div>
          <div className="w-full flex flex-col">
            <label className="mb-2 text-lg dark:text-white font-semibold" htmlFor="password">
              Password
            </label>
            <input
              className="py-4 px-2 rounded-md outline-none ring-1 focus:ring-2 dark:ring-white ring-black dark:bg-transparent dark:text-white"
              type="password"
              id="password"
              name="password"
              placeholder="Password"
            />
          </div>
          <Button className="w-full p-2 border-2 border-black dark:border-white rounded-md text-center font-semibold dark:text-white text-black" type="submit">
            Sign In
          </Button>
        </form>
      </section>
    );
  };

  const renderSignUp = () => {
    return (
      <section className="w-full flex flex-col justify-center items-center">
        <h1 className="text-3xl dark:text-white">Sign Up</h1>
        <form className="w-1/3 flex flex-col justify-center items-start gap-4" onSubmit={handleSubmit}>
          <div className="w-full flex flex-col">
            <label className="mb-2 text-lg dark:text-white font-semibold" htmlFor="name">
              Name
            </label>
            <input
              className="py-4 px-2 rounded-md outline-none ring-1 focus:ring-2 dark:ring-white ring-black dark:bg-transparent dark:text-white"
              type="text"
              id="name"
              name="name"
              placeholder="Jhon Doe"
            />
          </div>
          <div className="w-full flex flex-col">
            <label className="mb-2 text-lg dark:text-white font-semibold" htmlFor="email">
              Email
            </label>
            <input
              className="py-4 px-2 rounded-md outline-none ring-1 focus:ring-2 dark:ring-white ring-black dark:bg-transparent dark:text-white"
              type="email"
              id="email"
              name="email"
              placeholder="customer@gmail.com"
            />
          </div>
          <div className="w-full flex flex-col">
            <label className="mb-2 text-lg dark:text-white font-semibold" htmlFor="password">
              Password
            </label>
            <input
              className="py-4 px-2 rounded-md outline-none ring-1 focus:ring-2 dark:ring-white ring-black dark:bg-transparent dark:text-white"
              type="password"
              id="password"
              name="password"
              placeholder="Password"
            />
          </div>
          <Button className="w-full p-2 rounded-md text-center font-semibold text-white dark:text-black bg-black dark:bg-white" type="submit">
            Sign Up
          </Button>
        </form>
      </section>
    );
  };

  const renderView = () => {
    if (storedUser.email) {
      return renderSignIn();
    }
    return renderSignUp();
  };

  return renderView();
};

export default SignIn;
