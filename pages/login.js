import { getProviders, signIn } from "next-auth/react";

const Login = ({ providers }) => {
  return (
    <div className="flex flex-col items-center bg-black min-h-screen w-full justify-center">
      <img className="w-52 mb-5" src="https://links.papareact.com/9xl" />
      {Object.values(providers).map(({ id, name, signinUrl }) => (
        <div key={name}>
          <button
            href={signinUrl}
            className="bg-[#18D860] text-white p-5 rounded-full"
            onClick={() => signIn(id, { callbackUrl: "/" })}
          >
            Login with {name}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Login;

export async function getServerSideProps(context) {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
