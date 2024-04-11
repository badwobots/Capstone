const APIURL = `https://fakestoreapi.com`;

const fetchSingleUser = async (userId, token, setSelectedUser) => {
  try {
      const response = await fetch(`${APIURL}/users/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
    if (!response.ok) {
      throw new Error(`Failed to fetch user #${userId}`);
    }
    const userData = await response.json();
    console.log(`Fetched user #${userId}:`, userData);
    setSelectedUser(userData);
  } catch (err) {
    console.error(`Error fetching user #${userId}!`, err);
  }
};


export default fetchSingleUser;