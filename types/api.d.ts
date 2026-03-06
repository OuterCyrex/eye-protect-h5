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
      phone: string;
      name: string;
      gender: string;
      idCard: string;
      status: string;
      lastLoginTime: string;
      emergencyContact: string;
      emergencyPhone: string;
      address: string;
      currentStudentId: string;
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

  namespace Intervene {
    interface interveneInfo {
      institutionName: string;
      doctorSignature: string;
      planType: string;
      diagnosis: string;
      structuredDiagnosis: {
        planItems: Array<{
          index: number;
          name: string;
          remark: string;
        }>;
        diagnosisSuggestion: {
          diagnosisTypes: string[];
          opticalIntervention: {
            enabled: boolean;
            frameGlasses: null | string;
            contactLenses: null | string;
            controlLenses: null | string;
          };
          drugIntervention: {
            enabled: boolean;
            drugs: null | string;
          };
          visualTraining: {
            enabled: boolean;
            trainingItems: null | string;
          };
          environmentalIntervention: {
            enabled: boolean;
            items: string[];
          };
        };
        reviewTime: string;
      };
      axisRatioCalculation: null | string;
      visualFunctionDiagnosis: string;
      planDate: string;
      nextReviewDate: string;
      reviewRule: string;
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

  namespace Coupon {
    interface couponInfo {
      id: string;
      institutionId: string;
      institutionName: string;
      name: string;
      type: number;
      description: string;
      maxCouponCount: number;
      validStartDate: string;
      validEndDate: string;
      usageRules: string;
      status: number;
    }

    interface MyCoupon {
      id: string;
      voucherId: string;
      voucherCode: string;
      status: number;
      type: number;
      receiveTime: string;
      usedTime: string;
      expireDate: string;
      institutionId: string;
      usedInstitutionId: string;
      usedInstitutionName: string;
      usageRules: string;
      orderNumber: string;
      note: string;
    }
  }

  namespace Reservation {
    interface reservationInfo {
      id: string;
      patientId: string;
      scheduleDate: string;
      timeSlot: number;
      appointmentType: number;
      appointmentTypeDesc: string;
      isFirstVisit: boolean;
      institutionName: string;
      institutionId: string;
      status: number;
      createdAt: string;
    }

    interface reservationTimeRequest {
      institutionId: string;
      date: string;
      type: number;
    }

    interface reserveRequest {
      patientId: string;
      institutionId: string;
      type: number;
      date: string;
      timeSlot: number;
    }
  }
}
