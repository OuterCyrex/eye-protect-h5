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

    interface LoginVerificationCodeRequest {
      phone: string;
      verificationCode: string;
    }

    interface ChangePasswordRequest {
      phone: string;
      verificationCode: string;
      newPassword: string;
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
      areaCode: string;
      provinceName: string;
      cityName: string;
      emergencyContact: string;
      emergencyPhone: string;
      address: string;
      avatarUrl: string;
      birthDate: string;
      email: string;
    }

    interface UpdateUserInfoRequest {
      id: string;
      userType: string;
      baseInfo: {
        name: string;
        phone: string;
        idCard: string;
        gender: string;
        status: string;
        password: string;
        areaCode: string;
      };
      parentExtension: {
        birthDate: string;
        email: string;
        emergencyContact: string;
        emergencyPhone: string;
        address: string;
      };
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

    interface GetArticleListRequest {
      current: number;
      size: number;
      title: string;
      source: string;
      tagId: string;
      status: number;
      orderBy: string;
      orderDirection: string;
    }

    interface ExpertInfo {
      id: string;
      name: string;
      title: string;
      introduction: string;
      imageUrl: string;
      areaCode: string;
      areaName: string;
      sortOrder: number;
      status: number;
      statusDesc: string;
    }

    interface GetExpertListRequest {
      current: number;
      size: number;
      name: string;
      title: string;
      areaCode: string;
      status: number;
      orderBy: string;
      orderDirection: string;
    }

    interface articleInfo {
      id: string;
      title: string;
      source: string;
      link: string;
      coverImage: string;
      summary: string;
      tags: string[];
      viewCount: number;
      status: number;
      statusDesc: string;
      publishTime: string;
      createdAt: string;
      updatedAt: string;
    }

    interface AreaInfo {
      code: string;
      name: string;
    }

    interface AxiosChartUnit {
      id: string;
      recordDate: string;
      odAxialLength: number;
      osAxialLength: number;
      details: string;
    }

    interface timeSlotInfo {
      timeSlot: number;
      description: string;
      availableNumber: number;
    }

    interface feedbackRequest {
      province?: string;
      city?: string;
      title: string;
      content: string;
      images: string[];
      toDoctor?: boolean;
      sendWeChatNotification?: boolean;
    }

    interface QRCodeInfo {
      id: string;
      qrcodeUrl: string;
      areaCodes: string[];
      areaNames: string[];
      createTime: string;
      updateTime: string;
    }
  }

  namespace Intervene {
    interface interveneInfo {
      id: string;
      institutionName: string;
      doctorSignature: string;
      planType: string;
      diagnosis: string;
      structuredDiagnosis: {
        planItems: {
          index: number;
          name: string;
          remark: string;
        }[];
        diagnosisSuggestion: {
          diagnosisTypes: string[];
          opticalIntervention: {
            enabled: boolean;
            frameGlasses: string[];
            contactLenses: string[];
            controlLenses: string[];
          };
          drugIntervention: {
            enabled: boolean;
            drugs: {
              name: string;
            }[];
          };
          visualTraining: {
            enabled: boolean;
            trainingItems: string[];
          };
          environmentalIntervention: {
            enabled: boolean;
            items: string[];
          };
        };
        reviewTime: string;
      };
      axisRatioCalculation: number;
      visualFunctionDiagnosis: string;
      planDate: string;
      nextReviewDate: string;
      reviewRule: string;
    }

    interface report {
      patientId: string;
      patientName: string;
      gender: string;
      age: number;
      birthDate: string;
      phone: string;
      school: string;
      clazz: string;
      interventionMeasures: string;
      chartPoints: {
        id: string;
        recordDate: string;
        odAxialLength: number;
        osAxialLength: number;
        odAxialChange: number;
        osAxialChange: number;
        details: string;
      }[];
      archiveDetail: {
        id: string;
        patientId: string;
        patientName: string;
        gender: string;
        age: number;
        birthDate: string;
        parentPhone: string;
        schoolName: string;
        className: string;
        archiveNumber: string;
        lastCheckupDate: string;
        nextFollowupDate: string;
        fatherMyopia: boolean;
        fatherRefraction: string;
        motherMyopia: boolean;
        motherRefraction: string;
        visitReason: string;
        visitSource: string;
        previousCheckupDate: string;
        glassesWearingHabits: string;
        lensType: string;
        comfortLevel: string;
        oldGlassesDeformation: string;
        replacementCycle: string;
        eyeHabits: string;
        dailyNearWorkHours: number;
        readingWritingHours: number;
        bookDistance: number;
        screenTimeHours: number;
        screenDistance: number;
        screenHeight: string;
        penHoldingStyle: string;
        dailyOutdoorHours: number;
        sleepHours: number;
        familyHistory: string;
        maternalIllnessDuringPregnancy: boolean;
        medicalHistory: string;
        eyeDiseaseHistory: string;
        isPrematureBirth: boolean;
        birthWeight: number;
        eyeSurgeryHistory: string;
        refractiveSurgeryHistory: string;
        allergyHistory: string;
        createdAt: string;
        updatedAt: string;
        visionExaminations: {
          id: string;
          examinationDate: string;
          examType: string;
          diagnosis: string;
          recommendations: string;
          examiner: string;
          diagnosisSuggestions: string;
          remarks: string;
          axisRatioCalculation: number;
          leftEye: {
            uncorrectedDistant: number;
            uncorrectedDistantSign: number;
            uncorrectedNear: number;
            uncorrectedNearSign: number;
            correctedVision: number;
            correctedVisionSign: number;
            previousPrescriptionS: string;
            previousPrescriptionC: string;
            previousPrescriptionA: string;
            pd: number;
            eyePressure: number;
            axialLength: number;
            autoRefractionS: string;
            autoRefractionC: string;
            autoRefractionA: string;
            subjectiveRefractionS: string;
            subjectiveRefractionC: string;
            subjectiveRefractionA: string;
            subjectiveRefractionVa: string;
            dilatedAutoRefractionS: string;
            dilatedAutoRefractionC: string;
            dilatedAutoRefractionA: string;
            dilatedSubjectiveRefractionS: string;
            dilatedSubjectiveRefractionC: string;
            dilatedSubjectiveRefractionA: string;
            dilatedSubjectiveRefractionVa: string;
            slitLampExam: string;
            fundusExam: string;
            keratometryFlatK: string;
            keratometrySteepK: string;
            keratometryCornealAstigmatism: string;
            prescriptionS: string;
            prescriptionC: string;
            prescriptionA: string;
            pupilHeight: string;
          };
          rightEye: {
            uncorrectedDistant: number;
            uncorrectedDistantSign: number;
            uncorrectedNear: number;
            uncorrectedNearSign: number;
            correctedVision: number;
            correctedVisionSign: number;
            previousPrescriptionS: string;
            previousPrescriptionC: string;
            previousPrescriptionA: string;
            pd: number;
            eyePressure: number;
            axialLength: number;
            autoRefractionS: string;
            autoRefractionC: string;
            autoRefractionA: string;
            subjectiveRefractionS: string;
            subjectiveRefractionC: string;
            subjectiveRefractionA: string;
            subjectiveRefractionVa: string;
            dilatedAutoRefractionS: string;
            dilatedAutoRefractionC: string;
            dilatedAutoRefractionA: string;
            dilatedSubjectiveRefractionS: string;
            dilatedSubjectiveRefractionC: string;
            dilatedSubjectiveRefractionA: string;
            dilatedSubjectiveRefractionVa: string;
            slitLampExam: string;
            fundusExam: string;
            keratometryFlatK: string;
            keratometrySteepK: string;
            keratometryCornealAstigmatism: string;
            prescriptionS: string;
            prescriptionC: string;
            prescriptionA: string;
            pupilHeight: string;
          };
          createdAt: string;
        };
        visualFunctionTests: {
          id: string;
          examDate: string;
          worth4DotDistant: string;
          worth4DotNear: string;
          distantStereoVision: string;
          nearStereoVision: string;
          coverTest: string;
          distancePhoria: string;
          nearPhoria: string;
          npc: string;
          distanceBi: string;
          distanceBo: string;
          nearBi: string;
          nearBo: string;
          addPlus100: string;
          addMinus100: string;
          acaRatio: number;
          nra: number;
          bcc: number;
          pra: number;
          odAccommodationAmplitude: number;
          osAccommodationAmplitude: number;
          ouAccommodationAmplitude: number;
          odAccommodationFacility: number;
          osAccommodationFacility: number;
          ouAccommodationFacility: number;
          visualFunctionDiagnosis: string;
          createdAt: string;
        }[];
        followupRecords: {
          id: string;
          recordDate: string;
          patientComplaints: string;
          odDominantEye: boolean;
          osDominantEye: boolean;
          oldGlassesBrand: string;
          frameLensInspection: string;
          visualFunction: string;
          worth4Dot: string;
          eyePosition: string;
          npc: string;
          otherVisualTests: string;
          diagnosisSuggestions: string;
          doctorSignature: string;
          leftEye: {
            uncorrectedDistant: number;
            uncorrectedDistantSign: number;
            uncorrectedNear: number;
            uncorrectedNearSign: number;
            correctedVision: number;
            correctedVisionSign: number;
            previousPrescriptionS: string;
            previousPrescriptionC: string;
            previousPrescriptionA: string;
            eyePressure: number;
            axialLength: number;
            autoRefractionS: string;
            autoRefractionC: string;
            autoRefractionA: string;
            subjectiveRefractionS: string;
            subjectiveRefractionC: string;
            subjectiveRefractionA: string;
            dilatedAutoRefractionS: string;
            dilatedAutoRefractionC: string;
            dilatedAutoRefractionA: string;
            dilatedSubjectiveRefractionS: string;
            dilatedSubjectiveRefractionC: string;
            dilatedSubjectiveRefractionA: string;
            fundusExam: string;
            slitLampExam: string;
            keratometry: string;
            distantStereoVision: string;
            nearStereoVision: string;
            coverTest: string;
            correctDegreeD: number;
            correctDegreeN: number;
          };
          rightEye: {
            uncorrectedDistant: number;
            uncorrectedDistantSign: number;
            uncorrectedNear: number;
            uncorrectedNearSign: number;
            correctedVision: number;
            correctedVisionSign: number;
            previousPrescriptionS: string;
            previousPrescriptionC: string;
            previousPrescriptionA: string;
            eyePressure: number;
            axialLength: number;
            autoRefractionS: string;
            autoRefractionC: string;
            autoRefractionA: string;
            subjectiveRefractionS: string;
            subjectiveRefractionC: string;
            subjectiveRefractionA: string;
            dilatedAutoRefractionS: string;
            dilatedAutoRefractionC: string;
            dilatedAutoRefractionA: string;
            dilatedSubjectiveRefractionS: string;
            dilatedSubjectiveRefractionC: string;
            dilatedSubjectiveRefractionA: string;
            fundusExam: string;
            slitLampExam: string;
            keratometry: string;
            distantStereoVision: string;
            nearStereoVision: string;
            coverTest: string;
            correctDegreeD: number;
            correctDegreeN: number;
          };
          createdAt: string;
        }[];
      };
      analysis: string;
    }

    interface glassInfo {
      id: string;
      patientId: string;
      institutionId: string;
      prescriptionDate: string;
      productName: string;
      frameModel: string;
      lensModel: string;
      lensType: string;
      quantity: number;
      totalPrice: number;
      remarks: string;
      rightSphere: number;
      rightCylinder: number;
      rightAxis: number;
      rightVisualAcuity: string;
      rightAdd: number;
      leftSphere: number;
      leftCylinder: number;
      leftAxis: number;
      leftVisualAcuity: string;
      leftAdd: number;
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
      id: number;
      serviceName: string;
      giftName: string;
      content: string;
      targetAudience: string;
      value: string;
      patientId: string;
      patientName: string;
      voucherCode: string;
      barcodeBase64: string;
      status: number;
      claimTime: string;
      verifyLocation: string;
      verifyTime: string;
      verifier: string;
      createdAt: string;
      updatedAt: string;
    }
  }

  namespace Reservation {
    interface reservationInfo {
      id: string;
      patientId: string;
      patientName: string;
      scheduleDate: string;
      timeSlot: number;
      timeSlotDesc: string;
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

  namespace Message {
    interface messageInfo {
      id: string;
      phone: string;
      type: number;
      title: string;
      content: string;
      images: any[];
      isRead: number;
      createdAt: string;
    }
  }
}
