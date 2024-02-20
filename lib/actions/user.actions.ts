"use server"

import {handleError} from "@/lib/utils";
import {connectToDatabase} from "@/lib/database/mongoose";
import User from "@/lib/database/models/user.model";
import {revalidatePath} from "next/cache";

// CREATE
export async function createUser(user:CreateUserParams){
    try {
        await connectToDatabase();
        const newUser = await User.create(user);
        return JSON.parse(JSON.stringify(newUser));
    }catch (error) {
        handleError(error);
    }
}

//READ
export async function getUserById(userId:string){
    try {
        await connectToDatabase();
        const user = await User.findOne({clerkId:userId});
        if(!user) throw new Error("User not found!");
        return JSON.parse(JSON.stringify(user));
    }catch (error) {
        handleError(error);
    }
}

//UPDATE
export async function updateUser(clerkId:string,user:UpdateUserParams){
    try {
        await connectToDatabase();
        const updatedUser = await User.findOneAndUpdate(
            {clerkId},
            user,
            {new:true}
        );
        if(!updatedUser) throw new Error("User update failed!");
        return JSON.parse(JSON.stringify(updatedUser));
    }catch (error) {
        handleError(error);
    }
}

//DELETE
export async function deleteUser(clerkId:string){
    try {
        await connectToDatabase();

        //find user to delete
        const userToDelete = await User.findOne({clerkId});

        if(!userToDelete) throw new Error("User not found!");

        //delete user
        const deletedUser = await User.findByIdAndDelete(userToDelete._id);
        revalidatePath("/");
        return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
    }catch (error) {
        handleError(error);
    }
}
