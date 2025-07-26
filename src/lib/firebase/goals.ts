// src/lib/firebase/goals.ts

import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc, query, where } from "firebase/firestore";
import { db } from "@/firebase/config";
import { SavingGoal } from "@/types";

// ADD a goal
export const addGoal = async (data: Omit<SavingGoal, 'id'>) => {
  const docRef = await addDoc(collection(db, "saving_goals"), data);
  return { id: docRef.id, ...data };
};

// GET goals for a user
export const getUserGoals = async (userId: string): Promise<SavingGoal[]> => {
  const q = query(collection(db, "saving_goals"), where("userId", "==", userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as SavingGoal));
};

// DELETE
export const deleteGoal = async (id: string) => {
  await deleteDoc(doc(db, "saving_goals", id));
};

// UPDATE
export const updateGoal = async (id: string, updatedData: Partial<Omit<SavingGoal, 'id'>>) => {
  await updateDoc(doc(db, "saving_goals", id), updatedData);
};
