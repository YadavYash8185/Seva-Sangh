import React, { createContext, useContext, useState, useEffect } from 'react';

interface Donation {
  id: number;
  title: string;
  description: string;
  category: string;
  quantity: string;
  urgency: 'low' | 'medium' | 'high';
  location: string;
  contactInfo: string;
  ngoId: number;
  ngoName: string;
  ngoContact: string;
  postedAt: string;
  status: 'active' | 'completed' | 'cancelled';
}

interface DonationContextType {
  donations: Donation[];
  addDonation: (donation: Donation) => void;
  updateDonation: (donation: Donation) => void;
  deleteDonation: (id: number) => void;
}

const DonationContext = createContext<DonationContextType | undefined>(undefined);

export const useDonations = () => {
  const context = useContext(DonationContext);
  if (!context) {
    throw new Error('useDonations must be used within a DonationProvider');
  }
  return context;
};

// Sample data for demonstration
const sampleDonations: Donation[] = [
  {
    id: 1,
    title: "Winter Clothing for Children",
    description: "We need warm winter clothes for children aged 5-12 years. Items needed include jackets, sweaters, warm pants, and winter accessories. These donations will help keep children in our care warm during the cold months.",
    category: "Clothing & Textiles",
    quantity: "50 pieces",
    urgency: "high",
    location: "Delhi, India",
    contactInfo: "help@childcare.org",
    ngoId: 1,
    ngoName: "Children's Care Foundation",
    ngoContact: "+91 9876543210",
    postedAt: "2025-01-10T10:00:00Z",
    status: "active"
  },
  {
    id: 2,
    title: "Educational Books and Supplies",
    description: "Looking for textbooks, notebooks, pencils, and other educational materials for underprivileged students. We especially need mathematics and science books for grades 6-10.",
    category: "Books & Education",
    quantity: "200 books, 100 notebooks",
    urgency: "medium",
    location: "Mumbai, India",
    contactInfo: "education@futurebuilders.org",
    ngoId: 2,
    ngoName: "Future Builders NGO",
    ngoContact: "+91 9876543211",
    postedAt: "2025-01-09T14:30:00Z",
    status: "active"
  },
  {
    id: 3,
    title: "Medical Equipment and Supplies",
    description: "Urgent need for basic medical supplies including bandages, antiseptics, thermometers, and blood pressure monitors for our community health center.",
    category: "Medical Supplies",
    quantity: "Assorted medical supplies",
    urgency: "high",
    location: "Bangalore, India",
    contactInfo: "medical@healthfirst.org",
    ngoId: 3,
    ngoName: "Health First Organization",
    ngoContact: "+91 9876543212",
    postedAt: "2025-01-08T09:15:00Z",
    status: "active"
  },
  {
    id: 4,
    title: "Food Supplies for Shelter",
    description: "We need non-perishable food items like rice, lentils, cooking oil, and canned goods for our homeless shelter. We serve approximately 100 people daily.",
    category: "Food & Groceries",
    quantity: "50kg rice, 20kg lentils, 10L oil",
    urgency: "medium",
    location: "Chennai, India",
    contactInfo: "shelter@safehaven.org",
    ngoId: 4,
    ngoName: "Safe Haven Shelter",
    ngoContact: "+91 9876543213",
    postedAt: "2025-01-07T16:45:00Z",
    status: "active"
  },
  {
    id: 5,
    title: "Toys and Games for Orphanage",
    description: "Looking for educational toys, board games, and recreational items for children in our orphanage. Age range is 3-15 years. Both indoor and outdoor play items are welcome.",
    category: "Toys & Games",
    quantity: "30-40 toys and games",
    urgency: "low",
    location: "Pune, India",
    contactInfo: "care@brightfuture.org",
    ngoId: 5,
    ngoName: "Bright Future Orphanage",
    ngoContact: "+91 9876543214",
    postedAt: "2025-01-06T11:20:00Z",
    status: "active"
  }
];

export const DonationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [donations, setDonations] = useState<Donation[]>([]);

  useEffect(() => {
    // Load donations from localStorage or use sample data
    const storedDonations = localStorage.getItem('sevaDonations');
    if (storedDonations) {
      setDonations(JSON.parse(storedDonations));
    } else {
      setDonations(sampleDonations);
      localStorage.setItem('sevaDonations', JSON.stringify(sampleDonations));
    }
  }, []);

  const addDonation = (donation: Donation) => {
    const newDonations = [...donations, donation];
    setDonations(newDonations);
    localStorage.setItem('sevaDonations', JSON.stringify(newDonations));
  };

  const updateDonation = (updatedDonation: Donation) => {
    const newDonations = donations.map(donation =>
      donation.id === updatedDonation.id ? updatedDonation : donation
    );
    setDonations(newDonations);
    localStorage.setItem('sevaDonations', JSON.stringify(newDonations));
  };

  const deleteDonation = (id: number) => {
    const newDonations = donations.filter(donation => donation.id !== id);
    setDonations(newDonations);
    localStorage.setItem('sevaDonations', JSON.stringify(newDonations));
  };

  const value = {
    donations,
    addDonation,
    updateDonation,
    deleteDonation
  };

  return (
    <DonationContext.Provider value={value}>
      {children}
    </DonationContext.Provider>
  );
};