import { useSelector } from "react-redux";

export function useGetUser() {
  const { userLoading, userError, isUserLoggedIn, currentUser } = useSelector(
    (state) => ({
      userLoading: state.user.loading,
      userError: state.user.error,
      isUserLoggedIn: state.user.isUserLoggedIn,
      currentUser: state.user.currentUserData,
    })
  );

  return [userLoading, userError, isUserLoggedIn, currentUser];
}
