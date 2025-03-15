import { useState } from 'react';
import Select from 'react-select';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import jsPDF from 'jspdf';

const OrderModal = ({ table, onClose, onSave, menuItems }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [isGeneratingBill, setIsGeneratingBill] = useState(false);

  const menuOptions = menuItems.map(item => ({
    value: item.id,
    label: `${item.name} - ₹${item.price}`,
    ...item
  }));

  const handleAddItem = (selectedOption) => {
    setSelectedItems([
      ...selectedItems,
      { ...selectedOption, quantity: 1 }
    ]);
  };

  const handleQuantityChange = (index, value) => {
    const newItems = [...selectedItems];
    newItems[index].quantity = parseInt(value) || 1;
    setSelectedItems(newItems);
  };

  const handleRemoveItem = (index) => {
    setSelectedItems(selectedItems.filter((_, i) => i !== index));
  };

  const calculateSubtotal = () => {
    return selectedItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateGST = (subtotal) => {
    return subtotal * 0.09; // 9% SGST and 9% CGST
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const gst = calculateGST(subtotal);
    const discountAmount = (subtotal * discount) / 100;
    return subtotal + (gst * 2) - discountAmount;
  };

  const generateKOT = () => {
    const doc = new jsPDF();
    const currentDate = format(new Date(), 'dd/MM/yyyy HH:mm:ss');
    
    doc.setFontSize(16);
    doc.text('Kitchen Order Ticket (KOT)', 105, 20, { align: 'center' });
    
    doc.setFontSize(12);
    doc.text(`Table: ${table.number}`, 20, 40);
    doc.text(`Date: ${currentDate}`, 20, 50);
    doc.text(`KOT #: ${Math.floor(Math.random() * 10000)}`, 20, 60);
    
    doc.line(20, 70, 190, 70);
    doc.text('Item', 20, 80);
    doc.text('Qty', 150, 80);
    doc.line(20, 85, 190, 85);
    
    let yPos = 95;
    selectedItems.forEach((item) => {
      doc.text(item.name, 20, yPos);
      doc.text(item.quantity.toString(), 150, yPos);
      yPos += 10;
    });
    
    doc.save('KOT.pdf');
    toast.success('KOT generated successfully!');
  };

  const generateBill = () => {
    const doc = new jsPDF();
    const currentDate = format(new Date(), 'dd/MM/yyyy HH:mm:ss');
    const subtotal = calculateSubtotal();
    const gst = calculateGST(subtotal);
    const total = calculateTotal();
    
    doc.setFontSize(20);
    doc.text('INVOICE', 105, 20, { align: 'center' });
    
    doc.setFontSize(12);
    doc.text(`Table: ${table.number}`, 20, 40);
    doc.text(`Date: ${currentDate}`, 20, 50);
    doc.text(`Bill #: ${Math.floor(Math.random() * 10000)}`, 20, 60);
    
    doc.line(20, 70, 190, 70);
    doc.text('Item', 20, 80);
    doc.text('Qty', 130, 80);
    doc.text('Price', 160, 80);
    doc.line(20, 85, 190, 85);
    
    let yPos = 95;
    selectedItems.forEach((item) => {
      doc.text(item.name, 20, yPos);
      doc.text(item.quantity.toString(), 130, yPos);
      doc.text(`₹${(item.price * item.quantity).toFixed(2)}`, 160, yPos);
      yPos += 10;
    });
    
    yPos += 10;
    doc.line(20, yPos, 190, yPos);
    yPos += 10;
    
    doc.text(`Subtotal: ₹${subtotal.toFixed(2)}`, 130, yPos);
    yPos += 10;
    doc.text(`SGST (9%): ₹${gst.toFixed(2)}`, 130, yPos);
    yPos += 10;
    doc.text(`CGST (9%): ₹${gst.toFixed(2)}`, 130, yPos);
    yPos += 10;
    if (discount > 0) {
      doc.text(`Discount (${discount}%): ₹${((subtotal * discount) / 100).toFixed(2)}`, 130, yPos);
      yPos += 10;
    }
    doc.text(`Total: ₹${total.toFixed(2)}`, 130, yPos);
    
    doc.save('Bill.pdf');
    toast.success('Bill generated successfully!');
    setIsGeneratingBill(true);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Table {table.number} Order</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Add Items
          </label>
          <Select
            options={menuOptions}
            onChange={handleAddItem}
            placeholder="Search menu items..."
            className="mb-4"
          />

          {selectedItems.map((item, index) => (
            <div key={index} className="flex items-center gap-4 mb-2 p-2 bg-gray-50 rounded">
              <span className="flex-1">{item.name}</span>
              <span>₹{item.price}</span>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => handleQuantityChange(index, e.target.value)}
                className="w-20 px-2 py-1 border rounded"
              />
              <button
                onClick={() => handleRemoveItem(index)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Discount (%)
          </label>
          <input
            type="number"
            min="0"
            max="100"
            value={discount}
            onChange={(e) => setDiscount(parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="space-y-2 mb-6">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>₹{calculateSubtotal().toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>SGST (9%):</span>
            <span>₹{calculateGST(calculateSubtotal()).toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>CGST (9%):</span>
            <span>₹{calculateGST(calculateSubtotal()).toFixed(2)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between">
              <span>Discount ({discount}%):</span>
              <span>₹{((calculateSubtotal() * discount) / 100).toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between font-bold">
            <span>Total:</span>
            <span>₹{calculateTotal().toFixed(2)}</span>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={generateKOT}
            disabled={selectedItems.length === 0}
            className="button-secondary"
          >
            Generate KOT
          </button>
          <button
            onClick={generateBill}
            disabled={selectedItems.length === 0 || isGeneratingBill}
            className="button-primary"
          >
            Generate Bill
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderModal;