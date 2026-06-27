// To add more Credly badges:
//   1. Go to your Credly badge page → click "Share" → copy the badge URL
//   2. Extract the UUID: credly.com/badges/{UUID}
//   3. Set badgeId to that UUID, verified: true, and update credlyUrl

export const certifications = [
  {
    id: 1,
    title: 'Microsoft Certified: Azure Fundamentals',
    shortTitle: 'AZ-900',
    issuer: 'Microsoft',
    issuedYear: '2024',
    category: 'azure',
    accentColor: '#0078d4',
    badgeId: '8be57b4d-9cb9-4d4e-868d-479c0abd8652',
    credlyUrl: 'https://www.credly.com/badges/8be57b4d-9cb9-4d4e-868d-479c0abd8652',
    // Credly badge image — found at: credly.com/badges/{badgeId} → og:image
    imageUrl: 'https://images.credly.com/size/340x340/images/be8fcaeb-c769-4858-b567-ffaaa73ce8cf/image.png',
    verified: true,
  },
  {
    id: 2,
    title: 'GitHub Foundations',
    shortTitle: 'GitHub',
    issuer: 'GitHub',
    issuedYear: '2024',
    category: 'github',
    accentColor: '#171515',
    badgeId: 'c7b81313-40b7-4c47-9ab1-e2a47bbb6864',
    credlyUrl: 'https://www.credly.com/badges/c7b81313-40b7-4c47-9ab1-e2a47bbb6864',
    imageUrl: 'https://images.credly.com/images/024d0122-724d-4c5a-bd83-cfe3c4b7a073/image.png',
    verified: true,
  },
  {
    id: 3,
    title: 'GitHub Actions',
    shortTitle: 'Actions',
    issuer: 'GitHub',
    issuedYear: '2024',
    category: 'github',
    accentColor: '#171515',
    badgeId: 'YOUR_CREDLY_BADGE_UUID_HERE',
    credlyUrl: 'https://www.credly.com/users/venkatraman-nagarajan',
    imageUrl: null,
    verified: false,
  },
];
