// tslint:disable:max-line-length

import rorre from 'rorre'

export default rorre.declare({
  ERR_CMD_ACTN_V_UND: `The command action is mandatory and must be set via .action().`,
  ERR_CMD_ACTN_V_TYP: `The command (or program) action must be a function.`,
  ERR_CMD_DESC_V_UND: `The command description is mandatory and must be set via .description().`,
  ERR_CMD_DESC_V_LEN: `The command description can't be empty.`,
  ERR_CMD_DESC_V_TYP: `The command description must be a string.`,
  ERR_CMD_SLUG_V_LEN: `The command slug can't be empty.`,
  ERR_CMD_SLUG_V_TYP: `The command slug must be a string.`,
  ERR_CMD_SLUG_V_FMT: `The command slug can only contains letters or single dashes and must start/end with a letter.`,
  ERR_CMD_SLUG_V_CFT: `This command slug has already been declared.`,
  ERR_CMD_PROC_X_FLT_C: `The provided custom filter threw an error.`,

  ERR_FLT_ELSE_C_OBL: `You can't use #else() in a mandatory filter.`,

  ERR_OPT_SLUG_V_FMT: `The option slug format is wrong.`,

  ERR_PRG_DESC_V_LEN: `The program description can't be empty.`,
  ERR_PRG_DESC_V_TYP: `The program description must be a string.`,
  ERR_PRG_DESC_V_UND: `The program description is mandatory and must be set via .description() or .info().`,
  ERR_PRG_INFO_V_TYP: `The <npmInfo> parameter must be a npm package.json object.`,
  ERR_PRG_NAME_V_UND: `The program name is mandatory and must be set via .name() or .info().`,
  ERR_PRG_NAME_V_LEN: `The program name can't be empty.`,
  ERR_PRG_NAME_V_TYP: `The program name must be a string.`,
  ERR_PRG_VERS_V_UND: `The version is mandatory and must be set via .version() or .info().`,
  ERR_PRG_VERS_V_SEM: `The program version is not a valid SemVer string. Please check https://semver.org to get more info.`,
  ERR_PRG_VERS_V_TYP: `The program version must be a string.`,
  ERR_PRG_VERS_V_NOV: `The version you set can't start with a "v" or a "V". If you want to declare "vX.Y.Z", just declare "X.Y.Z".`,

  ERR_VAL_DESC_V_LEN: `The option (or value) description can't be empty.`,
  ERR_VAL_DESC_V_TYP: `The option (or value) description must be a string.`,
  ERR_VAL_FILT_V_TYP: `The option (or value) filter is not processable as is. Specify, at least, both the obligation and type.`,
  ERR_VAL_FILT_V_TYP_C: `If you want to use a custom option (or value) filter, this filter must be a function.`,
  ERR_VAL_NAME_V_LEN: `The option slug (or value name) can't be empty.`,
  ERR_VAL_NAME_V_TYP: `The option slug (or value name) must be a string.`,
})
