import { previewLocale } from "emails/utils/previewLocale";
import { applyRTL } from "emails/utils/RTL";
import i18n, { TFunction } from "i18next";
import { Text, render } from "jsx-email";
import { GetSubject, GetTemplate, GetTemplateProps } from "keycloakify-emails";
import { createVariablesHelper } from "keycloakify-emails/variables";
import { EmailLayout } from "../layout";

type TemplateProps = Omit<GetTemplateProps, "plainText"> & { t: TFunction };

const paragraph = {
    lineHeight: 1.5,
    fontSize: 14,
    textAlign: "left" as const
};

const rtlStyle = {
    direction: "rtl" as const,
    textAlign: "right" as const
};

export const previewProps: TemplateProps = {
    t: i18n.getFixedT(previewLocale),
    locale: previewLocale,
    themeName: "vanilla"
};

export const templateName = "Update Password";

const { exp } = createVariablesHelper("event-update_password.ftl");

export const Template = ({ locale, t }: TemplateProps) => {
    const isRTL = locale === "ar";

    return (
        <EmailLayout preview={t("event-update_password.subject")} locale={locale}>
            <Text style={applyRTL(paragraph, isRTL, rtlStyle)}>
                {t("event-update_password.message", {
                    date: exp("event.date"),
                    ipAddress: exp("event.ipAddress")
                })}
            </Text>

            <Text style={applyRTL(paragraph, isRTL, rtlStyle)}>
                {t("event-update_password.contactAdmin")}
            </Text>
        </EmailLayout>
    );
};

export const getTemplate: GetTemplate = async props => {
    const t = i18n.getFixedT(props.locale);
    return await render(<Template {...props} t={t} />, { plainText: props.plainText });
};

export const getSubject: GetSubject = async props => {
    const t = i18n.getFixedT(props.locale);
    return t("event-update_password.subject");
};
