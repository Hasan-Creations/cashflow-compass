
import { auth, db } from "@/firebase/config";
import { deleteUser } from "firebase/auth";
import { collection, query, where, getDocs, writeBatch, doc } from "firebase/firestore";

// Helper function to delete collections
const deleteCollection = async (collectionRef: any) => {
    const q = query(collectionRef);
    const snapshot = await getDocs(q);
    
    const batch = writeBatch(db);
    snapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
    });

    await batch.commit();
}


export const deleteUserAccount = async () => {
    const user = auth.currentUser;
    if (!user) throw new Error("No user is signed in.");

    const userId = user.uid;

    // Delete all user data from Firestore
    // Note: This requires indexes on userId for each collection
    const transactionsRef = collection(db, 'transactions');
    const goalsRef = collection(db, 'saving_goals');
    const recurringRef = collection(db, 'recurring_expenses');
    const userDocRef = doc(db, 'users', userId);

    const userTransactionsQuery = query(transactionsRef, where('userId', '==', userId));
    const userGoalsQuery = query(goalsRef, where('userId', '==', userId));
    const userRecurringQuery = query(recurringRef, where('userId', '==', userId));

    const transactionDocs = await getDocs(userTransactionsQuery);
    const goalDocs = await getDocs(userGoalsQuery);
    const recurringDocs = await getDocs(userRecurringQuery);

    const batch = writeBatch(db);

    transactionDocs.forEach(doc => batch.delete(doc.ref));
    goalDocs.forEach(doc => batch.delete(doc.ref));
    recurringDocs.forEach(doc => batch.delete(doc.ref));
    batch.delete(userDocRef);
    
    await batch.commit();
    
    // Delete user from Auth
    await deleteUser(user);
}
