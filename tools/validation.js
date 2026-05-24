export function required(name, value) {
  if (!value || String(value).trim() === "") {
    return `${name} is required.`;
  }
}

export function minLength(min) {
  return (name, value) => {
    if (value && String(value).trim().length < min) {
      return `${name} must be at least ${min} characters.`;
    }
  };
}

export function maxLength(max) {
  return (name, value) => {
    if (value && String(value).trim().length > max) {
      return `${name} must be at most ${max} characters.`;
    }
  };
}

export function isEmail(name, value) {
  const text = String(value || "").trim();

  if (!text.includes("@") || !text.includes(".")) {
    return `${name} must be a valid email address.`;
  }
}

export function validateField(name, value, validators) {
  for (const validator of validators) {
    const error = validator(name, value);

    if (error) {
      return error;
    }
  }
}

export function oneOf(allowedValues) {
  return (name, value) => {
    if (!allowedValues.includes(value)) {
      return `${name} must be one of: ${allowedValues.join(", ")}.`;
    }
  };
}

export function validateSchema(formData, schema) {
  let isValid = true;
  const validated = {};

  const errorEntries = Object.entries(schema).map(([key, config]) => {
    const value = formData.get(key);
    const displayName = config.displayName || key;
    const message = validateField(displayName, value, config.validators) || "";

    if (message) {
      isValid = false;
    } else {
      validated[key] = typeof value === "string" ? value.trim() : value;
    }

    return [
      key,
      {
        value,
        message,
        error: Boolean(message)
      }
    ];
  });

  const errors = Object.fromEntries(errorEntries);

  return {
    isValid,
    errors,
    validated
  };
}

export const interestSchema = {
  studentName: {
    displayName: "Full name",
    validators: [required, minLength(2), maxLength(80)]
  },
  studentEmail: {
    displayName: "Email address",
    validators: [required, maxLength(120), isEmail]
  }
};
export const loginSchema = {
  username: {
    displayName: "Username",
    validators: [required, minLength(2), maxLength(50)]
  },
  password: {
    displayName: "Password",
    validators: [required, minLength(6), maxLength(100)]
  }
};
export const programmeSchema = {
  title: {
    displayName: "Programme title",
    validators: [required, minLength(3), maxLength(120)]
  },
  level: {
    displayName: "Programme level",
    validators: [required, oneOf(["Undergraduate", "Postgraduate"])]
  },
  description: {
    displayName: "Description",
    validators: [required, minLength(20), maxLength(1000)]
  },
  programmeLeaderId: {
    displayName: "Programme leader",
    validators: []
  },
  published: {
    displayName: "Published status",
    validators: []
  }
  
};
export const moduleSchema = {
  title: {
    displayName: "Module title",
    validators: [required, minLength(3), maxLength(120)]
  },
  description: {
    displayName: "Module description",
    validators: [required, minLength(10), maxLength(800)]
  },
  moduleLeaderId: {
    displayName: "Module leader",
    validators: []
  }
};
export const programmeModuleSchema = {
  moduleId: {
    displayName: "Module",
    validators: [required]
  },
  year: {
    displayName: "Year of study",
    validators: [required, oneOf(["1", "2", "3", "4"])]
  }
};