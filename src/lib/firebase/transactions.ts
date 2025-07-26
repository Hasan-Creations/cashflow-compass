// src/lib/firebase/transactions.ts

import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc, query, where } from "firebase/firestore";
import { db } from "@/firebase/config";
import { Transaction } from "@/types";

// ADD a new transaction
export const addTransaction = async (data: Omit<Transaction, 'id'>) => {
  const docRef = await addDoc(collection(db, "transactions"), data);
  return { id: docRef.id, ...data };
};

// GET all transactions for a user
export const getUserTransactions = async (userId: string): Promise<Transaction[]> => {
    const q = query(collection(db, "transactions"), where("userId", "==", userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Transaction));
};


// DELETE a transaction
export const deleteTransaction = async (id: string) => {
  await deleteDoc(doc(db, "transactions", id));
};

// UPDATE a transaction
export const updateTransaction = async (id: string, updatedData: Partial<Omit<Transaction, 'id'>>) => {
  await updateDoc(doc(db, "transactions", id), updatedData);
};
