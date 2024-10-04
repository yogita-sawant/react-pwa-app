import { useEffect, useState } from 'react';

function UsersPage() {

    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [mode, setMode] = useState("online")

    useEffect(() => {
        let url = 'https://jsonplaceholder.typicode.com/users';
        fetch(url)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => {
                setData(data);
                localStorage.setItem("users", JSON.stringify(data))
            })
            .catch(error => {
                // alert("catch block")
                let collection = localStorage.getItem("users")
                setData(JSON.parse(collection))
                setMode("offline")
                // if (error.message === 'Failed to fetch') {
                //     setError('Failed to fetch data. Please check your internet connection or the server.');
                // } else {
                //     setError(error.message);
                // }
            });
    }, []);


    return (
        <div className="flex flex-col items-center justify-center px-4 py-8 md:py-16">
            <h1 className="text-3xl font-bold mb-4">Users List</h1>

            <div>
                {
                    mode === 'offline' ?
                        <p>offline</p> : <p>online</p>
                }

            </div>
            {error && <p className="text-red-500">{error}</p>}
            <div className="w-full md:w-1/2">
                <table className="w-full">
                    <thead>
                        <tr>
                            <th className="px-2 py-2">ID</th>
                            <th className="px-2 py-2">Name</th>
                            <th className="px-2 py-2">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map(user => (
                            <tr key={user.id}>
                                <td className="px-2 py-2">{user.id}</td>
                                <td className="px-2 py-2">{user.name}</td>
                                <td className="px-2 py-2">{user.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UsersPage;

