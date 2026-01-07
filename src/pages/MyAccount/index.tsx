import { Button } from '../../components';
import { useAppStore } from '../../store';
import { User } from '../../store/store.types';

const MyAccount = (): JSX.Element => {
  const orders = useAppStore((state) => state.orders);
  const storedUser: User = JSON.parse(localStorage.getItem('user') || '{}');

  const handleEditAccount = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const updatedUser = { name: formData.get('name'), email: formData.get('email'), password: formData.get('password'), orders };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    alert('Account updated successfully');
  };

  return (
    <section className="w-full flex flex-col justify-center items-center">
      <h1 className="mb-6 text-3xl dark:text-white">My Account</h1>
      <div className="w-full flex flex-col justify-between items-center gap-4">
        <form className="w-1/3 flex flex-col justify-center items-center gap-4" onSubmit={handleEditAccount}>
          <div className="w-full flex flex-col">
            <label className="mb-2 text-lg dark:text-white font-semibold" htmlFor="name">
              Name
            </label>
            <input
              className="py-4 px-2 rounded-md outline-none ring-1 focus:ring-2 dark:ring-white ring-black dark:bg-transparent dark:text-white"
              type="text"
              id="name"
              name="name"
              defaultValue={storedUser?.name}
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
              defaultValue={storedUser?.email}
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
              defaultValue={storedUser?.password}
            />
          </div>
          <Button className="w-full p-2 border-2 border-black dark:border-white rounded-md text-center font-semibold dark:text-white text-black" type="submit">
            Update
          </Button>
        </form>
      </div>
    </section>
  );
};

export default MyAccount;
