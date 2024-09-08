import axios from "axios";
import jsPDF from "jspdf";

export const appointmentdetail = async ({ record, status, id = false }) => {
  // console.log(record);
  // console.log(status);
  // console.log(id);
  if (!id) {
    document({ data: record, status }).save("generated.pdf");
  } else {
    sendPDFToBackend({ data: record, status });
  }
};
function sendPDFToBackend({ data, status }) {
  const pdfBlob = document({ data, status }).output("blob");
  const formData = new FormData();
  formData.append("email", data.email);
  formData.append("status", status);
  formData.append("name", data.name);
  formData.append("pdf", pdfBlob, "generated.pdf");
  // document({ data, status }).save("generated.pdf");
  axios
    .post("/api/v1/user/booking-test", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      // console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
}
function document({ data, status }) {
  const random = Math.floor(Math.random() * 1000000000);

  // console.log("random", random);
  const doc = new jsPDF();
  const logo =
    "https://res.cloudinary.com/dhf7n7ccs/image/upload/v1710696993/logo-no-background_qomcgr.png";
  // Header
  doc.setFontSize(24);
  //   doc.text("Hospital Name", 10, 20);
  doc.addImage(logo, "PNG", 10, 10, 80, 25);
  doc.setFontSize(12);
  doc.text("Phone: 123-456-7890", 140, 10);
  doc.text("Email: TheHopeHospital.com", 140, 20);
  doc.text("Address: Ranchi Road Ramgarh", 140, 30);
  doc.text("Jharkhand 829117", 140, 40);

  // Appointments Details
  doc.setFontSize(16);
  doc.text("Appointments Details", 10, 60);
  doc.text("Status :" + status, 150, 60);

  // Horizontal Line
  doc.setLineWidth(0.5);
  doc.line(10, 65, 200, 65);

  // User Details
  // doc.setFontSize(18);
  // doc.text("User Details", 10, 70);
  doc.setFontSize(14);
  doc.text("Name: " + data.name, 10, 75);
  doc.text("Age: " + data.age, 90, 75);
  doc.text("Gender: " + data.gender, 10, 85);
  doc.text("Email: " + data.email, 90, 85);
  doc.text("Phone: " + data.phone, 10, 95);
  doc.text("Address: " + data.address, 90, 95);

  // Doctor Details
  doc.setFontSize(16);
  doc.text("Your Appointment with Dr. " + data.doctorName + "", 10, 110);
  doc.setFontSize(14);
  doc.text("Visit Date: " + data.date, 10, 120);
  doc.text("Visit Time : " + data.time, 90, 120);

  // Payment Details
  doc.setFontSize(18);
  doc.text("Payment Details :", 10, 135);
  doc.setFontSize(14);
  doc.text("Amount: " + data.fee, 10, 145);
  doc.text("Payment Method: card", 90, 145);
  doc.text("Payment ID: " + random, 10, 155);

  return doc;
}
