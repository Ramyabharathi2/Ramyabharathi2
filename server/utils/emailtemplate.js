export const generateJobEmail = (job) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Job Opportunity</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 20px auto;
                background: #ffffff;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
                background: #007bff;
                color: #ffffff;
                text-align: center;
                padding: 10px;
                border-radius: 10px 10px 0 0;
            }
            .content {
                padding: 20px;
                color: #333;
            }
            .footer {
                text-align: center;
                padding: 10px;
                background: #f4f4f4;
                font-size: 12px;
                border-radius: 0 0 10px 10px;
            }
            .btn {
                display: inline-block;
                background: #007bff;
                color: #ffffff;
                padding: 10px 20px;
                text-decoration: none;
                border-radius: 5px;
                margin-top: 10px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>Exciting Job Opportunity!</h2>
            </div>
            <div class="content">
                <h3>${job.companyName}</h3>
                <p><strong>Job Type:</strong> ${job.jobType}</p>
                <p><strong>Job Role(s):</strong> ${job.jobRoles.join(', ')}</p>
                <p><strong>Nature of Job:</strong> ${job.jobNature}</p>
                <p><strong>Vacancies:</strong> ${job.totalVacancies}</p>
                <p><strong>Description:</strong> ${job.jobDescription}</p>
                <p><strong>Required Skills:</strong> ${job.requiredSkills}</p>
                <p><strong>Experience:</strong> ${job.experienceRequired}</p>
                <p><strong>Qualification:</strong> ${job.qualification}</p>
                <p><strong>Salary Package:</strong> ${job.salaryPackage}</p>
                <p><strong>Location:</strong> ${job.district}, ${job.country}</p>
                <p><strong>Company Info:</strong> ${job.companyInformation}</p>
                <p><strong>Accommodation:</strong> ${job.accommodation}</p>
                <p><strong>Apply From:</strong> ${job.applicationStartDate} to ${job.applicationEndDate}</p>
                <a href="mailto:${job.contactEmail}" class="btn">Apply Now</a>
            </div>
            <div class="footer">
                <p>For more information, contact us at ${job.contactNumber} or ${job.contactEmail}</p>
            </div>
        </div>
    </body>
    </html>
    `;
};






export const generateThankYouEmail = (application, companyName, internshipTitle, contactEmail) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank You for Applying</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 20px auto;
                background: #ffffff;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                text-align: center;
            }
            .header {
                background: #28a745;
                color: #ffffff;
                text-align: center;
                padding: 10px;
                border-radius: 10px 10px 0 0;
            }
            .content {
                padding: 20px;
                color: #333;
            }
            .footer {
                text-align: center;
                padding: 10px;
                background: #f4f4f4;
                font-size: 12px;
                border-radius: 0 0 10px 10px;
            }
            .btn {
                display: inline-block;
                background: #28a745;
                color: #ffffff;
                padding: 10px 20px;
                text-decoration: none;
                border-radius: 5px;
                margin-top: 10px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>Thank You for Applying!</h2>
            </div>
            <div class="content">
                <p>Dear ${application.applicantName},</p>
                <p>We appreciate your interest in the <strong>${internshipTitle}</strong> position at <strong>${companyName}</strong>.</p>
                <p>Our team is currently reviewing your application, and we will get back to you shortly.</p>
                <p>If you have any further queries, feel free to reach out.</p>
                <a href="mailto:${contactEmail}" class="btn">Contact Us</a>
            </div>
            <div class="footer">
                <p>Best Regards,<br>${companyName} Recruitment Team</p>
            </div>
        </div>
    </body>
    </html>
    `;
};








export const generateAdminAlertEmail = (application, companyName, internshipTitle) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Job Application Alert</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 20px auto;
                background: #ffffff;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
                background: #dc3545;
                color: #ffffff;
                text-align: center;
                padding: 10px;
                border-radius: 10px 10px 0 0;
            }
            .content {
                padding: 20px;
                color: #333;
            }
            .footer {
                text-align: center;
                padding: 10px;
                background: #f4f4f4;
                font-size: 12px;
                border-radius: 0 0 10px 10px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>New Job Application Received</h2>
            </div>
            <div class="content">
                <p><strong>Applicant Name:</strong> ${application.applicantName}</p>
                <p><strong>Email:</strong> ${application.email}</p>
                <p><strong>Phone:</strong> ${application.phone}</p>
                <p><strong>Applied for:</strong> ${internshipTitle} at ${companyName}</p>
                <p><strong>Resume:</strong> <a href="http://localhost:5000${application.resumeUrl}">View Resume</a></p>
            </div>
            <div class="footer">
                <p>Admin Alert - Please review the application.</p>
            </div>
        </div>
    </body>
    </html>
    `;
};
