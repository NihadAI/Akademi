export interface Teachers {
    id?: number,
    name: string;
    position: string;
    phone: string;
    email: string;
}

export interface TeachersState{
    loading:boolean;
    error:string;
    teachers: Teachers[]
}

export interface TeacherSingleState{
    loading: boolean;
    error: string;
    teacherData: Teachers | null;
}

export interface TeacherEditState{
    loading: boolean;
    error: string;
    teacherData: Teachers | null;
}

export interface TeacherDeleteState{
    loading: boolean;
    error: string;
}

export interface TeacherAddState{
    loading: boolean;
    error: string;
    teacherData: Teachers | null;
}