import LoginForm from "@/app/components/auth/LoginForm";

const LoginPage = () => {
  return (
    <section style={{ backgroundImage: `url('/bg.png')` }} className=" object-cover bg-cover h-screen grid place-items-center">
      <div className="max-w-[450px] w-full mx-auto p-6 border border-gray-700/20 rounded-md">
        <h4 className="font-bold text-2xl text-center">Sign in</h4>
        <LoginForm />
      </div>
    </section>
  )
}

export default LoginPage;