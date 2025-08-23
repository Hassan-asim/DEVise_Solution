// Email Service for sending contact form emails via Gmail API
// This service calls our backend API to send emails

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface EmailResponse {
  success: boolean;
  message: string;
  messageId?: string;
  error?: string;
}

// Send contact form email via our API
export const sendContactEmail = async (formData: ContactFormData): Promise<EmailResponse> => {
  try {
    // Validate form data
    if (!formData.name || !formData.email || !formData.message) {
      return {
        success: false,
        message: 'Please fill in all required fields.'
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return {
        success: false,
        message: 'Please enter a valid email address.'
      };
    }

    // Try Gmail API first
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        return {
          success: true,
          message: result.message || 'Email sent successfully! We will get back to you soon.',
          messageId: result.messageId
        };
      } else {
        // If Gmail API fails, fall back to mailto
        console.log('Gmail API failed, using mailto fallback');
        sendEmailFallback(formData);
        return {
          success: true,
          message: 'Email client opened! Please send the email from your email application.'
        };
      }
    } catch (apiError) {
      // If API completely fails, use mailto fallback
      console.log('Gmail API error, using mailto fallback:', apiError);
      sendEmailFallback(formData);
      return {
        success: true,
        message: 'Email client opened! Please send the email from your email application.'
      };
    }

  } catch (error) {
    console.error('Error sending email:', error);
    // Last resort - try mailto
    try {
      sendEmailFallback(formData);
      return {
        success: true,
        message: 'Email client opened! Please send the email from your email application.'
      };
    } catch (fallbackError) {
      return {
        success: false,
        message: 'Unable to send email. Please contact us directly at team@devisesolutions.co',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
};

// Fallback method using mailto (opens user's email client)
export const sendEmailFallback = (formData: ContactFormData): void => {
  const recipients = [
    'hassanalisajid786@gmail.com',
    'hassanasim337@gmail.com',
    'team@devisesolutions.co'
  ];
  
  const subject = encodeURIComponent(`Contact from ${formData.name} - DEVise Solutions`);
  const body = encodeURIComponent(`
Hi there,

I'm reaching out through your website contact form.

Name: ${formData.name}
Email: ${formData.email}

Message:
${formData.message}

Best regards,
${formData.name}
  `);
  
  const mailtoLink = `mailto:${recipients.join(',')}?subject=${subject}&body=${body}`;
  window.open(mailtoLink, '_blank');
};

// Utility function to validate contact form data
export const validateContactForm = (formData: ContactFormData): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!formData.name?.trim()) {
    errors.push('Name is required');
  }

  if (!formData.email?.trim()) {
    errors.push('Email is required');
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.push('Please enter a valid email address');
    }
  }

  if (!formData.message?.trim()) {
    errors.push('Message is required');
  } else if (formData.message.trim().length < 10) {
    errors.push('Message must be at least 10 characters long');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};
