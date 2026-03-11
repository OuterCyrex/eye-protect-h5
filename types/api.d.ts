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
      password: string;
      role: string;
      userDetailId: string;
      userDetailType: string;
      lastLoginTime: string;
      loginCount: number;
      status: string;
      createdAt: string;
      updatedAt: string;
      deleted: number;
      remainingCouponCount: number;
      wechatOpenId: string;
      wechatUnionId: string;
      wechatGender: string;
    }

    interface UserDetail {
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
    }

    interface UpdateUserInfoRequest {
      name: string;
      phone: string;
      idCard: string;
      gender: string;
      birthDate: string;
      email: string;
      status: string;
      password: string;
      lastLoginTime: string;
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

    interface AxiosChartUnit {
      id: string;
      recordDate: string;
      odAxialLength: number;
      osAxialLength: number;
      details: string;
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

    interface report {
      patientId: number;
      patientName: string;
      gender: string;
      age: number;
      birthDate: string;
      phone: string;
      school: string;
      clazz: string;
      interventionMeasures: string;
      chartPoints?: {
        checkDate: string;
        age: number;
        axialLengthData: {
          axialLength: number;
          previousAxialLength: number;
          growthAmount: number;
          growthRatePerYear: number;
          ageCriticalValue: number;
          ageCriticalAxialLength: number;
        };
        heightData: {
          height: number;
          ageCriticalHeight: number;
        };
        riskWarning: string;
      };
      analysis: string;
    }
  }

  namespace Student {
    interface studentInfo {
      id: string;
      name: string;
      gender: string;
      birthDate: string;
      idCard: string;
      className: string;
      schoolId: string;
      province: string;
      parentName: string;
      phone: string;
      cancelCount: number;
      patientId: string;
      schoolName: string;
      lastCheckupDate: string;
      nextFollowupDate: string;
      leftBareVision: number;
      leftSphere: number;
      leftCylinder: number;
      leftAxis: number;
      rightBareVision: number;
      rightSphere: number;
      rightCylinder: number;
      rightAxis: number;
      leftWarningRisk: string;
      rightWarningRisk: string;
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
