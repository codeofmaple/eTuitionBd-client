import React, { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useSecureAxios from "../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const getIdString = (rawId) => {
    if (!rawId) return null;
    if (typeof rawId === "string") return rawId;
    if (rawId.$oid) return rawId.$oid;
    if (rawId.toString) return rawId.toString();
    return String(rawId);
};

const EditModal = ({ tuition, onClose }) => {
    const axiosSecure = useSecureAxios();
    const queryClient = useQueryClient();

    // initialize react-hook-form
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            title: "",
            subject: "",
            classGrade: "",
            salary: "",
            location: "",
            description: "",
            status: "",
            isBooked: false,
        },
    });

    // whenever tuition prop changes, reset form values
    useEffect(() => {
        if (tuition) {
            // normalize salary to plain number/string for form
            const normalized = {
                ...tuition,
                salary: tuition.salary?.$numberInt ?? tuition.salary ?? "",
            };
            reset(normalized);
        }
    }, [tuition, reset]);

    const updateMutation = useMutation({
        mutationFn: async ({ id, payload }) => {
            return axiosSecure.put(`/tuitions/${id}`, payload);
        },
        onSuccess: () => {
            toast.success("Tuition updated successfully");
            queryClient.invalidateQueries(["my-tuitions"]);
            onClose();
        },
        onError: (err) => {
            console.error("Update error:", err);
            toast.error("Update failed");
        },
    });

    const onSubmit = (data) => {
        if (!tuition) return toast.error("No tuition selected");

        const id = getIdString(tuition._id);
        if (!id) return toast.error("Invalid tuition id");

        // Build payload: only allowed fields
        const payload = {
            title: data.title,
            subject: data.subject,
            classGrade: data.classGrade,
            salary: data.salary !== "" ? Number(data.salary) : undefined,
            location: data.location,
            description: data.description,
            status: data.status,
            isBooked: data.isBooked,
        };

        // Remove undefined keys
        Object.keys(payload).forEach((k) => payload[k] === undefined && delete payload[k]);

        updateMutation.mutate({ id, payload });
    };

    return (
        <dialog className="modal modal-open">
            <div className="modal-box max-w-xl">
                <h3 className="font-bold text-xl mb-4">Edit Tuition</h3>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                    <input className="input input-bordered w-full" {...register("title")} placeholder="Title" />
                    <input className="input input-bordered w-full" {...register("subject")} placeholder="Subject" />
                    <input className="input input-bordered w-full" {...register("classGrade")} placeholder="Class Grade" />
                    <input className="input input-bordered w-full" {...register("salary")} type="number" placeholder="Salary" />
                    <input className="input input-bordered w-full" {...register("location")} placeholder="Location" />
                    <textarea className="textarea textarea-bordered w-full" {...register("description")} placeholder="Description" />
                    <select className="select select-bordered w-full" {...register("status")}>
                        <option value="">Select status</option>
                        <option value="pending">pending</option>
                        <option value="approved">approved</option>
                        <option value="booked">booked</option>
                    </select>

                    <div className="modal-action">
                        <button type="submit" className="btn btn-primary">Save Changes</button>
                        <button
                            type="button"
                            className="btn"
                            onClick={() => {
                                reset();
                                onClose();
                            }}
                        >
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </dialog>
    );
};

export default EditModal;
