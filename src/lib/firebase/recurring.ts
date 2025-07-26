// src/lib/firebase/recurring.ts

import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc, query, where } from "firebase/firestore";
import { db } from "@/firebase/config";
import { RecurringExpense } from "@/types";

// ADD a recurring expense
export const addRecurring = async (data: Omit<RecurringExpense, 'id'>) => {
  const docRef = await addDoc(collection(db, "recurring_expenses"), data);
  return { id: docRef.id, ...data };
};

// GET recurring expenses for a user
export const getUserRecurring = async (userId: string): Promise<RecurringExpense[]> => {
  const q = query(collection(db, "recurring_expenses"), where("userId", "==", userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as RecurringExpense));
};

// DELETE
export const deleteRecurring = async (id: string) => {
  await deleteDoc(doc(db, "recurring_expenses", id));
};

// UPDATE
export const updateRecurring = async (id: string, updatedData: Partial<Omit<RecurringExpense, 'id'>>) => {
  await updateDoc(doc(db, "recurring_expenses", id), updatedData);
};
