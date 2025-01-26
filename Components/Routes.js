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

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve all gadgets
 *     description: Get a list of all gadgets, optionally filtered by status.
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Filter gadgets by their status (e.g., 'Available', 'Deployed', 'Destroyed', 'Decommissioned').
 *     responses:
 *       200:
 *         description: A list of gadgets.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The unique ID of the gadget.
 *                   name:
 *                     type: string
 *                     description: The name of the gadget.
 *                   status:
 *                     type: string
 *                     description: The status of the gadget (e.g., Active, Decommissioned).
 *                   mission_Success_Probability:
 *                     type: string
 *                     description: The success probability of the gadget in percentage.
 */

/**
 * @swagger
 * /:
 *   post:
 *     summary: Add a new gadget
 *     description: Create a new gadget and add it to the list.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               
 *     responses:
 *       201:
 *         description: Gadget successfully created.
 */

/**
 * @swagger
 * /{id}:
 *   patch:
 *     summary: Update a gadget
 *     description: Modify the details of a gadget.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the gadget to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               
 *     responses:
 *       200:
 *         description: Gadget successfully updated.
 */

/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Delete a gadget
 *     description: Remove a gadget from the list.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the gadget to delete.
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Gadget successfully deleted.
 */
/**
 * @swagger
 * /{id}/self-destruct:
 *   post:
 *     summary: Initiate gadget self-destruct sequence
 *     description: Starts the self-destruct sequence for a specific gadget and provides a confirmation code.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the gadget to self-destruct.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Self-destruct sequence initiated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message confirming the initiation of the self-destruct sequence.
 *                 confirmationCode:
 *                   type: string
 *                   description: A randomly generated 6-digit confirmation code for the self-destruct sequence.
 *       500:
 *         description: Error triggering self-destruct sequence.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                 error:
 *                   type: string
 *                   description: Details about the error.
 */
