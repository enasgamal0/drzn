import { AbilityBuilder } from "@casl/ability";
import { mapPermissionsToAbilityCombos } from "@/utils/permissionAdapter";

export default AbilityBuilder.define((can) => {
  let abilityCombos = [];

  const storedAbility = localStorage.getItem(
    "drzn_admin_dashboard_user_ability"
  );

  if (storedAbility) {
    try {
      abilityCombos = JSON.parse(storedAbility) || [];
    } catch (error) {
      abilityCombos = [];
    }
  }

  if (!abilityCombos.length && localStorage.getItem("drzn_admin_roles")) {
    try {
      const permissions =
        JSON.parse(localStorage.getItem("drzn_admin_roles"))?.permissions || [];
      abilityCombos = mapPermissionsToAbilityCombos(permissions);
    } catch (error) {
      abilityCombos = [];
    }
  }

  abilityCombos.forEach((combo) => {
    if (combo?.action && combo?.subject) {
      can(combo.action, combo.subject);
    }
  });
});
