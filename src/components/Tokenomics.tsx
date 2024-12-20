import React from 'react';
import { PieChart, Wallet, Lock, Users } from 'lucide-react';

export default function Tokenomics() {
  return (
    <section id="tokenomics" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center">Tokenomics</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-6">Token Distribution</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Wallet className="h-5 w-5 mr-2" />
                  <span>Public Sale</span>
                </div>
                <span className="font-bold">40%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Lock className="h-5 w-5 mr-2" />
                  <span>Team & Advisors</span>
                </div>
                <span className="font-bold">20%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  <span>Community & Ecosystem</span>
                </div>
                <span className="font-bold">30%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <PieChart className="h-5 w-5 mr-2" />
                  <span>Reserve</span>
                </div>
                <span className="font-bold">10%</span>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-6">Token Details</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-bold">Total Supply</h4>
                <p className="text-gray-600">1,000,000,000 PAVE</p>
              </div>
              <div>
                <h4 className="font-bold">Initial Market Cap</h4>
                <p className="text-gray-600">$50,000,000</p>
              </div>
              <div>
                <h4 className="font-bold">Vesting Schedule</h4>
                <p className="text-gray-600">Team tokens locked for 2 years with quarterly releases</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}