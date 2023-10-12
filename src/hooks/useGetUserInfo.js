const useGetUserInfo = () => {
    //here we deserialize the data from string back into an object
  const {name,  userID, profilePhoto, isAuth} = JSON.parse(localStorage.getItem("auth")) || {}

  //we return the individual values of the object
  return {name,  userID, profilePhoto, isAuth}
}

export default useGetUserInfo