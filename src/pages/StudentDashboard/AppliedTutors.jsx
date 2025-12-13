// // AppliedTutors.jsx
// import { useParams } from 'react-router';
// import { useEffect, useState } from 'react';
// import useSecureAxios from '../../hooks/useAxiosSecure';

// const AppliedTutors = () => {
//     const { tuitionId } = useParams();
//     const [applications, setApplications] = useState([]);
//     const axiosSecure = useSecureAxios();

//     useEffect(() => {
//         axiosSecure.get(`/applications/for-my-tuition/${tuitionId}`)
//             .then(res => setApplications(res.data))
//             .catch(err => console.error(err));
//     }, [tuitionId, axiosSecure]);

//     return (
//         <div>
//             <h2 className="text-2xl font-bold mb-6">Applied Tutors</h2>
//             {/* Render applications with Accept/Reject buttons */}
//         </div>
//     );
// };

// export default AppliedTutors;


import React from 'react';

const AppliedTutors = () => {
    return (
        <div>

        </div>
    );
};

export default AppliedTutors;