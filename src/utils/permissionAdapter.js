// Helper utilities to bridge new backend permission naming with legacy CASL rules

const STATIC_PERMISSION_MAP = {
  "create-role": [
    { action: "roles create", subject: "roles" },
  ],
  "read-role": [
    { action: "roles index", subject: "roles" },
    { action: "roles show", subject: "roles" },
  ],
  "update-role": [
    { action: "roles edit", subject: "roles" },
    { action: "roles activate", subject: "roles" },
  ],
  "delete-role": [
    { action: "roles delete", subject: "roles" },
  ],
  "assign-role": [
    { action: "roles assign", subject: "roles" },
  ],
  "read-permission": [
    { action: "permissions index", subject: "permissions" },
    { action: "permissions show", subject: "permissions" },
  ],
  "assign-permission": [
    { action: "permissions assign", subject: "permissions" },
  ],
  "create-admin": [
    { action: "admins create", subject: "admins" },
  ],
  "read-admin": [
    { action: "admins index", subject: "admins" },
    { action: "admins show", subject: "admins" },
  ],
  "update-admin": [
    { action: "admins edit", subject: "admins" },
    { action: "admins activate", subject: "admins" },
  ],
  "delete-admin": [
    { action: "admins delete", subject: "admins" },
  ],
  "create-product-category": [
    { action: "categories create", subject: "categories" },
  ],
  "read-product-category": [
    { action: "categories index", subject: "categories" },
    { action: "categories show", subject: "categories" },
  ],
  "read-product-category:read-inactive": [
    { action: "categories read-inactive", subject: "categories" },
  ],
  "update-product-category": [
    { action: "categories edit", subject: "categories" },
    { action: "categories activate", subject: "categories" },
  ],
  "delete-product-category": [
    { action: "categories delete", subject: "categories" },
  ],
  "create-product": [
    { action: "products create", subject: "products" },
  ],
  "read-product": [
    { action: "products index", subject: "products" },
    { action: "products show", subject: "products" },
  ],
  "read-product:read-inactive": [
    { action: "products read-inactive", subject: "products" },
  ],
  "update-product": [
    { action: "products edit", subject: "products" },
    { action: "products activate", subject: "products" },
  ],
  "delete-product": [
    { action: "products delete", subject: "products" },
  ],
  "create-location": [
    { action: "locations create", subject: "locations" },
  ],
  "read-location": [
    { action: "locations index", subject: "locations" },
    { action: "locations show", subject: "locations" },
  ],
  "read-location:read-inactive": [
    { action: "locations read-inactive", subject: "locations" },
  ],
  "update-location": [
    { action: "locations edit", subject: "locations" },
    { action: "locations activate", subject: "locations" },
  ],
  "delete-location": [
    { action: "locations delete", subject: "locations" },
  ],
  "read-support-chat": [
    { action: "supportchats index", subject: "supportchats" },
    { action: "supportchats show", subject: "supportchats" },
  ],
  "update-support-chat": [
    { action: "supportchats edit", subject: "supportchats" },
  ],
  "read-setting": [
    { action: "settings index", subject: "settings" },
    { action: "settings show", subject: "settings" },
  ],
  "update-setting": [
    { action: "settings edit", subject: "settings" },
  ],
  "create-advertising": [
    { action: "advertisements create", subject: "advertisements" },
  ],
  "read-advertising": [
    { action: "advertisements index", subject: "advertisements" },
    { action: "advertisements show", subject: "advertisements" },
  ],
  "read-advertising:read-inactive": [
    { action: "advertisements read-inactive", subject: "advertisements" },
  ],
  "update-advertising": [
    { action: "advertisements edit", subject: "advertisements" },
    { action: "advertisements activate", subject: "advertisements" },
  ],
  "delete-advertising": [
    { action: "advertisements delete", subject: "advertisements" },
  ],
  "read-profile": [
    { action: "profile show", subject: "profile" },
  ],
  "update-profile": [
    { action: "profile edit", subject: "profile" },
  ],
  "delete-profile": [
    { action: "profile delete", subject: "profile" },
  ],
};

const RESOURCE_ALIASES = {
  advertising: "advertisements",
  profile: "profile",
  "support-chat": "supportchats",
};

const VERB_TO_ACTIONS = {
  create: ["create", "store"],
  read: ["index", "show", "list"],
  view: ["index", "show", "list"],
  update: ["edit", "update", "activate"],
  edit: ["edit", "update"],
  delete: ["delete", "destroy"],
  remove: ["delete", "destroy"],
  assign: ["assign"],
  approve: ["approve"],
  reject: ["reject"],
  activate: ["activate"],
  deactivate: ["deactivate"],
  export: ["export"],
  import: ["import"],
  verify: ["verify"],
  reset: ["reset"],
  register: ["register"],
  login: ["login"],
};

const PLURAL_EXCEPTIONS = {
  category: "categories",
  city: "cities",
  country: "countries",
  nationality: "nationalities",
  company: "companies",
  industry: "industries",
  profile: "profile",
};

function pluralize(word) {
  if (!word) return "";
  if (PLURAL_EXCEPTIONS[word]) return PLURAL_EXCEPTIONS[word];
  if (word.endsWith("y") && !/[aeiou]y$/.test(word)) {
    return word.slice(0, -1) + "ies";
  }
  if (word.endsWith("s")) {
    return word;
  }
  return `${word}s`;
}

function normalizeSubject(resourceSlug) {
  if (!resourceSlug) return "";
  if (RESOURCE_ALIASES[resourceSlug]) {
    return RESOURCE_ALIASES[resourceSlug];
  }

  const parts = resourceSlug.split("-");
  const base = parts[parts.length - 1] || resourceSlug;
  const subject = pluralize(base);
  return subject.replace(/\s+/g, "");
}

function buildActionsForVerb(verb, subject) {
  if (!verb || !subject) {
    return [];
  }
  const mappedActions = VERB_TO_ACTIONS[verb] || [verb];
  return mappedActions.map((legacyAction) => ({
    action: `${subject} ${legacyAction}`.trim(),
    subject,
  }));
}

export function mapPermissionNameToLegacyCombos(permissionName) {
  if (!permissionName) {
    return [];
  }

  if (STATIC_PERMISSION_MAP[permissionName]) {
    return STATIC_PERMISSION_MAP[permissionName];
  }

  const [baseName, extension] = permissionName.split(":");
  const segments = baseName.split("-");
  const verb = segments.shift();
  const resourceSlug = segments.join("-");
  const subject = normalizeSubject(resourceSlug);

  let combos = buildActionsForVerb(verb, subject);

  if (extension && subject) {
    combos = combos.concat({
      action: `${subject} ${extension}`.trim(),
      subject,
    });
  }

  return combos;
}

export function mapPermissionsToAbilityCombos(permissions = []) {
  const combosMap = new Map();

  permissions.forEach((permission) => {
    if (permission?.action && permission?.subject) {
      const key = `${permission.action}::${permission.subject}`;
      if (!combosMap.has(key)) {
        combosMap.set(key, {
          action: permission.action,
          subject: permission.subject,
        });
      }
      return;
    }

    const legacyCombos = mapPermissionNameToLegacyCombos(
      permission?.name || permission?.action
    );

    legacyCombos.forEach((combo) => {
      if (combo?.action && combo?.subject) {
        const key = `${combo.action}::${combo.subject}`;
        if (!combosMap.has(key)) {
          combosMap.set(key, combo);
        }
      }
    });
  });

  return Array.from(combosMap.values());
}

