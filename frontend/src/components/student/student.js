import axios from 'axios';
import 'boxicons/css/boxicons.min.css';
import jsPDF from 'jspdf';
import { useEffect, useState } from 'react';
import Body from '../bodycomp/body/body';
import '../student/student.css';

function StudentPage() {
  const [certificateData, setCertificateData] = useState(null);
  const [certId, setCertId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Helper to format date from regular Date object (not MongoDB $date format)
  const getDateString = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      console.error('Date parsing error:', error);
      return 'Invalid Date';
    }
  };

  // Clear messages after timeout
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError('');
        setSuccess('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  const fetchCertificate = async () => {
    if (!certId.trim()) {
      setError('Please enter a certificate ID.');
      setCertificateData(null);
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Updated API endpoint - ensure this matches your server route mounting
      // Based on your certificateRoutes.js, the endpoint should be:
      const response = await axios.get(`http://localhost:4000/certifire/certifire/certificates/${certId.trim()}`);
      
      if (response.data) {
        setCertificateData(response.data);
        setSuccess('Certificate found successfully!');
        console.log('Certificate data:', response.data);
      } else {
        throw new Error('No certificate data received');
      }
    } catch (err) {
      setCertificateData(null);
      console.error('Error fetching certificate:', err);
      
      if (err.response?.status === 404) {
        setError(`Certificate with ID "${certId}" not found. Please verify your Certificate ID.`);
      } else if (err.response?.status === 500) {
        setError('Server error occurred. Please try again later.');
      } else if (err.code === 'ECONNREFUSED') {
        setError('Cannot connect to server. Please ensure the server is running.');
      } else {
        setError('Unable to fetch certificate. Please check your connection and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      fetchCertificate();
    }
  };

  const clearSearch = () => {
    setCertId('');
    setCertificateData(null);
    setError('');
    setSuccess('');
  };

  const generatePDF = () => {
    if (!certificateData) return;

    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'pt',
      format: 'A4',
    });

    // Background
    doc.setFillColor(248, 249, 250);
    doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'F');

    // Certificate ID (top right)
    doc.setFont('Times', 'normal');
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text(`Certificate ID: ${certificateData.certId}`, doc.internal.pageSize.width - 60, 40, { align: 'right' });

    // Main Title
    doc.setFont('Times', 'bold');
    doc.setFontSize(32);
    doc.setTextColor(0, 0, 128);
    doc.text('Certificate of Internship', doc.internal.pageSize.width / 2, 100, { align: 'center' });

    // Decorative line
    doc.setDrawColor(0, 0, 128);
    doc.setLineWidth(2);
    doc.line(150, 120, doc.internal.pageSize.width - 150, 120);

    // Certificate body
    doc.setFont('Times', 'normal');
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);
    doc.text('This is to certify that', doc.internal.pageSize.width / 2, 170, { align: 'center' });

    // Student name
    doc.setFont('Times', 'bold');
    doc.setFontSize(28);
    doc.setTextColor(0, 0, 128);
    doc.text(certificateData.studentName, doc.internal.pageSize.width / 2, 210, { align: 'center' });

    // Internship text
    doc.setFont('Times', 'normal');
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);
    doc.text('has successfully completed an internship in', doc.internal.pageSize.width / 2, 250, { align: 'center' });

    // Domain
    doc.setFont('Times', 'bold');
    doc.setFontSize(24);
    doc.setTextColor(0, 0, 128);
    doc.text(certificateData.internshipDomain, doc.internal.pageSize.width / 2, 290, { align: 'center' });

    // Duration
    doc.setFont('Times', 'normal');
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);
    doc.text(
      `from ${getDateString(certificateData.startDate)} to ${getDateString(certificateData.endDate)}`,
      doc.internal.pageSize.width / 2,
      330,
      { align: 'center' }
    );

    // Date of issue
    doc.setFont('Times', 'italic');
    doc.setFontSize(14);
    doc.text(`Issued on: ${new Date().toLocaleDateString()}`, doc.internal.pageSize.width / 2, 370, { align: 'center' });

    // Signature section
    doc.setFont('Times', 'italic');
    doc.setFontSize(16);
    doc.text('Authorized Signature', doc.internal.pageSize.width / 2 + 200, doc.internal.pageSize.height - 80, { align: 'center' });
    doc.line(doc.internal.pageSize.width / 2 + 100, doc.internal.pageSize.height - 100, doc.internal.pageSize.width / 2 + 300, doc.internal.pageSize.height - 100);

    // Official seal
    doc.setFontSize(12);
    doc.text('Official Seal', doc.internal.pageSize.width / 2 - 200, doc.internal.pageSize.height - 80, { align: 'center' });
    doc.circle(doc.internal.pageSize.width / 2 - 200, doc.internal.pageSize.height - 120, 35, 'S');

    // Save with dynamic filename
    doc.save(`${certificateData.studentName.replace(/\s+/g, '_')}_Certificate_${certificateData.certId}.pdf`);
  };

  return (
    <div className='main'>
      <Body>
        <div className='student-main'>
          {/* Header Section */}
          <div className="header-section">
            <h1 className="page-title">Certificate Verification</h1>
            <p className="page-subtitle">Enter your certificate ID to verify and download your certificate</p>
          </div>

          {/* Search Section */}
          <div className='search-container'>
            <div className="input-wrapper">
              <input
                type="text"
                placeholder="Enter Certificate ID (e.g., C9932)"
                value={certId}
                onChange={(e) => setCertId(e.target.value.toUpperCase().trim())}
                onKeyDown={handleKeyDown}
                aria-label="Certificate ID"
                className="search-input"
                autoFocus
              />
              {certId && (
                <button className="clear-btn" onClick={clearSearch} aria-label="Clear">
                  <i className='bx bx-x'></i>
                </button>
              )}
            </div>
            <button 
              className={`search-btn ${loading ? 'loading' : ''}`} 
              onClick={fetchCertificate} 
              disabled={loading || !certId.trim()}
              aria-label="Search"
            >
              {loading ? (
                <i className='bx bx-loader bx-spin'></i>
              ) : (
                <i className='bx bx-search'></i>
              )}
              <span>{loading ? 'Searching...' : 'Search'}</span>
            </button>
          </div>

          {/* Status Messages */}
          {error && (
            <div className="message error-message">
              <i className='bx bx-error-circle'></i>
              <span>{error}</span>
            </div>
          )}
          
          {success && (
            <div className="message success-message">
              <i className='bx bx-check-circle'></i>
              <span>{success}</span>
            </div>
          )}

          {/* Certificate Display */}
          <div className="certificate-container">
            {certificateData && (
              <div className='certificate show'>
                <div style={styles.certificatePreview}>
                  {/* Certificate Header */}
                  <div style={styles.certificateHeader}>
                    <span style={styles.certificateId}>ID: {certificateData.certId}</span>
                    <span style={styles.verifiedBadge}>
                      <i className='bx bx-check-shield'></i> Verified
                    </span>
                  </div>

                  {/* Certificate Content */}
                  <h1 style={styles.title}>Certificate of Internship</h1>
                  <div style={styles.decorativeBorder}></div>
                  
                  <p style={styles.bodyText}>This is to certify that</p>
                  <h2 style={styles.studentName}>{certificateData.studentName}</h2>
                  <p style={styles.bodyText}>has successfully completed a professional internship in</p>
                  <h3 style={styles.internshipDomain}>{certificateData.internshipDomain}</h3>
                  
                  <div style={styles.durationSection}>
                    <div style={styles.dateBox}>
                      <span style={styles.dateLabel}>Start Date</span>
                      <span style={styles.dateValue}>{getDateString(certificateData.startDate)}</span>
                    </div>
                    <div style={styles.dateBox}>
                      <span style={styles.dateLabel}>End Date</span>
                      <span style={styles.dateValue}>{getDateString(certificateData.endDate)}</span>
                    </div>
                  </div>

                  {/* Signature Section */}
                  <div style={styles.signatureSection}>
                    <div style={styles.sealSection}>
                      <div style={styles.sealCircle}>
                        <i className='bx bx-certification' style={{fontSize: '24px', color: '#000080'}}></i>
                      </div>
                      <p style={styles.sealText}>Official Seal</p>
                    </div>
                    <div style={styles.signatureBox}>
                      <div style={styles.signatureLine}></div>
                      <p style={styles.signatureText}>Authorized Signature</p>
                    </div>
                  </div>

                  <div style={styles.issuedDate}>
                    Verified on: {new Date().toLocaleDateString()}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Download Section */}
          {certificateData && (
            <div className="action-section">
              <button className='download-btn primary' onClick={generatePDF} aria-label="Download PDF">
                <i className='bx bxs-download'></i>
                <span>Download Certificate</span>
              </button>
              <button className='download-btn secondary' onClick={() => window.print()} aria-label="Print">
                <i className='bx bx-printer'></i>
                <span>Print</span>
              </button>
            </div>
          )}
        </div>
      </Body>
    </div>
  );
}

// Enhanced responsive inline styles
const styles = {
  certificatePreview: {
    marginTop: '20px',
    padding: 'clamp(20px, 4vw, 40px)',
    backgroundColor: '#ffffff',
    borderRadius: '15px',
    width: '100%',
    maxWidth: '900px',
    margin: '0 auto',
    textAlign: 'center',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    border: '3px solid #f0f0f2',
    position: 'relative',
    overflow: 'hidden',
  },
  certificateHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    flexWrap: 'wrap',
    gap: '10px',
  },
  certificateId: {
    fontSize: 'clamp(12px, 1.5vw, 14px)',
    color: '#666',
    fontWeight: '500',
  },
  verifiedBadge: {
    backgroundColor: '#10b981',
    color: 'white',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: 'clamp(11px, 1.2vw, 13px)',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
  title: {
    fontSize: 'clamp(24px, 5vw, 36px)',
    fontWeight: 'bold',
    color: '#000080',
    marginBottom: '10px',
    textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
  },
  decorativeBorder: {
    width: '60%',
    height: '3px',
    background: 'linear-gradient(90deg, #000080, #667eea, #000080)',
    margin: '0 auto 30px auto',
    borderRadius: '2px',
  },
  bodyText: {
    fontSize: 'clamp(16px, 2.5vw, 20px)',
    margin: '15px 0',
    color: '#333',
    lineHeight: '1.6',
  },
  studentName: {
    fontSize: 'clamp(22px, 4vw, 32px)',
    fontWeight: 'bold',
    color: '#000080',
    margin: '20px 0',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  internshipDomain: {
    fontSize: 'clamp(18px, 3vw, 26px)',
    fontWeight: 'bold',
    color: '#667eea',
    margin: '20px 0',
    textTransform: 'capitalize',
  },
  durationSection: {
    display: 'flex',
    justifyContent: 'center',
    gap: 'clamp(20px, 5vw, 60px)',
    margin: '30px 0',
    flexWrap: 'wrap',
  },
  dateBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '15px 20px',
    backgroundColor: '#f8fafc',
    borderRadius: '10px',
    border: '1px solid #e2e8f0',
    minWidth: '140px',
  },
  dateLabel: {
    fontSize: 'clamp(12px, 1.5vw, 14px)',
    color: '#666',
    fontWeight: '500',
    marginBottom: '5px',
  },
  dateValue: {
    fontSize: 'clamp(14px, 2vw, 16px)',
    color: '#000080',
    fontWeight: 'bold',
  },
  signatureSection: {
    marginTop: '50px',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: '40px',
    flexWrap: 'wrap',
  },
  sealSection: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  sealCircle: {
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    border: '3px solid #000080',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8fafc',
    margin: '0 auto 10px auto',
  },
  sealText: {
    fontSize: 'clamp(12px, 1.5vw, 14px)',
    color: '#666',
    fontWeight: '500',
  },
  signatureBox: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  signatureLine: {
    width: '150px',
    borderBottom: '2px solid #000080',
    marginBottom: '10px',
  },
  signatureText: {
    fontSize: 'clamp(12px, 1.5vw, 14px)',
    color: '#666',
    fontStyle: 'italic',
    fontWeight: '500',
  },
  issuedDate: {
    marginTop: '30px',
    fontSize: 'clamp(11px, 1.2vw, 13px)',
    color: '#999',
    fontStyle: 'italic',
  },
};

export default StudentPage;
