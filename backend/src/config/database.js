import mongoose from 'mongoose';

const DEFAULT_LOCAL_URI = 'mongodb://127.0.0.1:27017/pathfinder_production';

let isConnected = false;

/**
 * Connects to MongoDB with connection pooling and event listeners.
 * @param {string} [uri] - Optional connection URI override
 * @returns {Promise<typeof mongoose>}
 */
export const connectDB = async (uri) => {
  const mongoUri = uri || process.env.MONGODB_URI || DEFAULT_LOCAL_URI;

  if (isConnected && mongoose.connection.readyState === 1) {
    return mongoose;
  }

  try {
    const options = {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4 // Use IPv4
    };

    const conn = await mongoose.connect(mongoUri, options);
    isConnected = true;
    console.log(`[Database] MongoDB Connected to host: ${conn.connection.host}, database: ${conn.connection.name}`);
    return conn;
  } catch (error) {
    isConnected = false;
    console.error(`[Database] MongoDB Connection Error: ${error.message}`);
    if (process.env.NODE_ENV === 'production') {
      throw new Error(`Critical Database Failure: Unable to establish connection to persistent MongoDB cluster. (${error.message})`);
    }
    throw error;
  }
};

/**
 * Disconnects from MongoDB gracefully.
 */
export const disconnectDB = async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
    isConnected = false;
    console.log('[Database] MongoDB Disconnected gracefully.');
  }
};

/**
 * Retrieves current database health and connection status.
 */
export const getDatabaseStatus = () => {
  const states = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
    99: 'uninitialized'
  };

  const stateCode = mongoose.connection ? mongoose.connection.readyState : 0;
  return {
    status: stateCode === 1 ? 'healthy' : 'degraded',
    state: states[stateCode] || 'unknown',
    host: mongoose.connection?.host || null,
    name: mongoose.connection?.name || null
  };
};

// Listeners for connection events
mongoose.connection.on('disconnected', () => {
  isConnected = false;
  console.warn('[Database] MongoDB connection lost. Attempting auto-reconnect...');
});

mongoose.connection.on('reconnected', () => {
  isConnected = true;
  console.log('[Database] MongoDB connection re-established.');
});

mongoose.connection.on('error', (err) => {
  console.error('[Database] MongoDB connection error:', err.message);
});
