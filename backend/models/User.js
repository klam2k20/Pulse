const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    pronouns: { type: String },
    bio: { type: String },
    pfp: {
      type: String,
      default:
        'https://www.pngfind.com/pngs/m/676-6764065_default-profile-picture-transparent-hd-png-download.png',
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function save(next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    console.log(`Encrypt User Password Error: ${err}`);
    return next(err);
  }
});

userSchema.methods.validatePassword = async function validatePassword(password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
