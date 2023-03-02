import Button from "./Button";
const SignupForm = ({
  error,
  setEmail,
  setPassword,
  handleEmailSignup,
  handleGoogleSignin,
  setAuthMethod,
}) => {
  return (
    <form
      action="#"
      className="flex flex-col gap-y-6 pt-8 pb-12 px-6 max-w-xs mx-auto rounded-2xl bg-white border-2 border-gray-500 shadow transition-shadow hover:shadow-2xl md:mx-0 md:max-w-md"
    >
      {/* email form group */}
      <div className="flex flex-col space-y-2 ">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="signup_email"
          className="border border-l-0 border-r-0 border-t-0 border-b-blue-600 border-4 py-2 px-4 "
          placeholder="Email..."
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {/* password form group */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="signup_password"
          className="border border-l-0 border-r-0 border-t-0 border-blue-600 border-4 py-2 px-4"
          placeholder="Password..."
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <p className="text-gray-500 text-center h-2"> {error ? error : ""}</p>
      {/* login button */}
      <Button type="submit" text="Sign up" onClick={handleEmailSignup} />

      {/* register option */}
      <p
        className="text-center text-sm cursor-pointer hover:underline"
        onClick={() => setAuthMethod("signin")}
      >
        Already have an account? Login
      </p>

      {/* google option */}
      <Button
        type="button"
        text="Sign up with Google"
        onClick={handleGoogleSignin}
      />
    </form>
  );
};

export default SignupForm;
