export interface Students {
    id?: number;
    name: string;
    time: string;
    parent_name: string;
    phone: string
    city: string;
    email: string;
    grade: string;
}

export interface StudentState {
    loading: boolean
    students: Students[]
    error: string 
}

export interface StudentSingleState {
    loading: boolean
    studentData: Students | null;
    error: string 
}

export interface StudentDeleteState {
    loading: boolean
    studentData: Students | null;
    error: string 
}

export interface StudentAddState {
    loading: boolean
    studentData: Students | null;
    error: string 
}

export interface StudentEditState {
    loading: boolean
    studentData: Students | null;
    error: string 
}

export type StudentTuition = {
    name: string;
    intuition: number;
    invoiceDate: string;
    status: string;
  };
  