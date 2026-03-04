declare namespace API {
  namespace Basic {
    interface List {
      size: number;
      current: number;
      total: number;
      records: Record[];
      pages: number;
    }
  }

  namespace Auth {
    interface LoginPasswordRequest {
      phone: string;
      password: string;
    }

    interface UserInfo {
      id: string;
      name: string;
      phone: string;
      idCard: string;
      gender: string;
      birthDate: string;
      email: string;
      emergencyContact: string;
      emergencyPhone: string;
      address: string;
      currentStudentId: string;
      status: string;
      createdAt: string;
      updatedAt: string;
      deleted: number;
    }
  }

  namespace Misc {
    interface institution {
      id: string;
      name: string;
      type: string;
      address: string;
      province: string;
      city: string;
      district: string;
      qualificationLevel: string;
      businessHours: string;
      logo: string;
      introduction: string;
      contactPhone: string;
      status: string;
      createdAt: string;
      updatedAt: string;
    }
  }

  namespace Student {
    interface studentInfo {
      id: string;
      name: string;
      gender: string;
      birthDate: string;
      idCard: any;
      className: string;
      schoolId: string;
      province: any;
      parentName: string;
      phone: string;
      cancelCount: number;
      lastCheckupDate: any;
      nextFollowupDate: any;
      leftBareVision: number;
      leftSphere: number;
      leftCylinder: number;
      leftAxis: number;
      rightBareVision: number;
      rightSphere: number;
      rightCylinder: number;
      rightAxis: number;
      glassesWearingHabits: any;
      diagnosisSuggestions: any;
    }

    interface addStudentRequest {
      name: string;
      gender: string;
      birthDate: string;
      idCard: string;
      className: string;
      schoolId: string;
      province: string;
      parentName: string;
    }
  }
}
