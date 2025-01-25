import Gadget from '../DataBase/Schema.js'

// Retrieve a list of all gadgets
export const getGadgets = async (req, res) => {
  try {
    const { status } = req.query;
   
    const gadgets = await Gadget.find({status}); // Fetch gadgets based on the query

    const response = gadgets.map(gadget => ({
      ...gadget.toObject(),
      mission_Success_Probability: `${Math.floor(Math.random() * 100)}%`,
    }));

    res.json(response); 
  } catch (err) {
    res.status(500).json({ message: 'Error fetching gadgets', error: err.message });
  }
};

// Post Method for add new gadget
export const addGadget = async (req, res) => {
  try {
    const { name } = req.body;
    console.log(req.body)
    // it's creates a new gadget 
    const newGadget = new Gadget({
      name,
    });

    await newGadget.save(); 
    res.status(201).json(newGadget); 
  } catch (err) {
    res.status(500).json({ message: 'Error while adding a gadget', error: err.message });
  }
};

// Update an existing gadget's information
export const updateGadget = async (req, res) => {
  try {
    const { id } = req.params; 
    const {name} = req.body; 
   
    // Find and update the gadget by ID
    const updatedGadget = await Gadget.updateOne({ _id:id },{$set:{name:name}});
    if (!updatedGadget) {
      return res.status(404).json({ message: 'Gadget is not found' });
    }
    res.json({message:'Gadget Information updated Successfully'}); 
  } catch (err) {
    res.status(500).json({ message: 'Error while updating gadget', error: err.message });
  }
};

// Mark a gadget as decommissioned instead of deleting it
export const deleteGadget = async (req, res) => {
  try {
   
    const { id } = req.params; 
    const gadget = await Gadget.findById({ _id:id });
    if (!gadget) {
      return res.status(404).json({ message: 'Gadget not found' });
    }

    gadget.status = 'Decommissioned';
    gadget.decommissionedAt = new Date();
    await gadget.save(); // Save the changes

    res.json({ message: 'Gadget decommissioned', gadget });
  } catch (err) {
    res.status(500).json({ message: 'Error decommissioning gadget', error: err.message });
  }
};

export const selfDestructGadget = async (req, res) => {
  try {
    const { id } = req.params; 

    // Generate a random 6-digit confirmation code
    const confirmationCode = Math.floor(100000 + Math.random() * 900000).toString();

    res.json({
      message: `Self-destruct sequence initiated for gadget ${id}. here is the Confirmation code: ${confirmationCode}`,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error triggering self-destruct sequence', error: err.message });
  }
};


