"use client";

import { useEffect, useMemo, useState } from "react";
import { CartItem, CheckoutForm, ZoneId, DeliveryType, PaymentMethod } from "@/lib/types";
import { ZONES } from "@/data/seed";
import { formatCRC } from "@/lib/format";
import { QuantityStepper } from "./QuantityStepper";
import { buildWhatsAppMessage, buildWhatsAppLink, generateOrderCode } from "@/lib/whatsapp";
import {
  X,
  Trash2,
  ShoppingBag,
  ChevronRight,
  ChevronLeft,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  subtotal: number;
  onUpdateQty: (productId: string, q: number) => void;
  onRemove: (productId: string) => void;
  onClearCart: () => void;
}

type Step = "cart" | "checkout";

const initialForm: CheckoutForm = {
  name: "",
  phone: "",
  address: "",
  zone: "",
  deliveryType: "domicilio",
  schedule: "",
  paymentMethod: "sinpe",
  notes: "",
};

export function Cart({ open, onClose, items, subtotal, onUpdateQty, onRemove, onClearCart }: Props) {
  const [step, setStep] = useState<Step>("cart");
  const [form, setForm] = useState<CheckoutForm>(initialForm);
  const [submitting, setSubmitting] = useState(false);

  // Bloquear scroll body cuando está abierto
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Reset step al cerrar
  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => setStep("cart"), 300);
      return () => clearTimeout(t);
    }
  }, [open]);

  const selectedZone = useMemo(
    () => (form.zone ? ZONES.find((z) => z.id === form.zone) : undefined),
    [form.zone]
  );

  const deliveryFee = useMemo(() => {
    if (form.deliveryType === "retiro") return 0;
    return selectedZone?.fee ?? 0;
  }, [form.deliveryType, selectedZone]);

  const total = subtotal + deliveryFee;

  const isFormValid = useMemo(() => {
    if (!form.name.trim() || !form.schedule) return false;
    // Teléfono Costa Rica: exactamente 8 dígitos, solo números.
    if (!/^\d{8}$/.test(form.phone)) return false;
    if (form.deliveryType === "domicilio") {
      if (!form.address.trim() || !form.zone) return false;
    }
    return true;
  }, [form]);

  const handleSubmit = () => {
    if (!isFormValid || items.length === 0 || submitting) return;
    setSubmitting(true);

    const orderCode = generateOrderCode();
    const message = buildWhatsAppMessage({
      orderCode,
      cart: items,
      form,
      subtotal,
      deliveryFee,
      total,
      zone: selectedZone,
    });
    const link = buildWhatsAppLink(message);

    // Mostrar "Enviando..." durante 2s antes de navegar.
    // No limpiar el carrito antes porque eso hace desaparecer el footer (gated en items.length > 0).
    setTimeout(() => {
      onClearCart();
      setForm(initialForm);
      setStep("cart");
      window.location.href = link;
    }, 2000);
  };

  const updateForm = <K extends keyof CheckoutForm>(key: K, value: CheckoutForm[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-ink/40 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 bottom-0 w-full sm:max-w-[480px] bg-cream-50 z-50 shadow-2xl flex flex-col transition-transform duration-500 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
      >
        {/* Header del drawer */}
        <header className="flex items-center justify-between px-5 py-4 border-b border-moss-100 bg-cream-50">
          <div className="flex items-center gap-3">
            {step === "checkout" && (
              <button
                type="button"
                onClick={() => setStep("cart")}
                aria-label="Volver al carrito"
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-moss-100 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-moss-800" />
              </button>
            )}
            <div>
              <span className="text-[10px] tracking-[0.22em] uppercase text-moss-600">
                Paso {step === "cart" ? "1" : "2"} de 2
              </span>
              <h2 className="font-display text-2xl text-ink tracking-tight leading-none mt-0.5">
                {step === "cart" ? "Tu canasta" : "Tus datos"}
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-moss-100 transition-colors"
          >
            <X className="w-5 h-5 text-ink" />
          </button>
        </header>

        {/* Body scrolleable */}
        <div className="flex-1 overflow-y-auto">
          {step === "cart" && (
            <CartStep
              items={items}
              onUpdateQty={onUpdateQty}
              onRemove={onRemove}
              onClearCart={onClearCart}
            />
          )}
          {step === "checkout" && (
            <CheckoutStep
              form={form}
              onChange={updateForm}
              selectedZone={selectedZone}
            />
          )}
        </div>

        {/* Footer fijo */}
        {items.length > 0 && (
          <footer className="border-t border-moss-100 bg-cream-50 p-5 space-y-4">
            {step === "checkout" && (
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-ink-soft">
                  <span>Subtotal</span>
                  <span className="tabular-nums">{formatCRC(subtotal)}</span>
                </div>
                <div className="flex justify-between text-ink-soft">
                  <span>
                    {form.deliveryType === "retiro" ? "Retiro en punto" : "Envío"}
                  </span>
                  <span className="tabular-nums">
                    {form.deliveryType === "retiro" ? "Sin costo" : formatCRC(deliveryFee)}
                  </span>
                </div>
              </div>
            )}

            <div className="flex items-end justify-between">
              <div>
                <span className="text-[10px] tracking-[0.22em] uppercase text-moss-600">
                  {step === "cart" ? "Subtotal" : "Total a pagar"}
                </span>
                <div className="font-display text-3xl text-ink tracking-tighter tabular-nums leading-none mt-1">
                  {formatCRC(step === "cart" ? subtotal : total)}
                </div>
              </div>
              {step === "cart" && (
                <span className="text-xs text-ink-soft text-right max-w-[140px]">
                  + envío en el siguiente paso
                </span>
              )}
            </div>

            {step === "cart" ? (
              <button
                type="button"
                onClick={() => setStep("checkout")}
                className="w-full bg-moss-800 hover:bg-moss-900 text-cream-50 py-4 rounded-full font-semibold text-base flex items-center justify-center gap-2 transition-all btn-organic shadow-soft"
              >
                Continuar al pedido
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!isFormValid || submitting}
                className="w-full bg-[#25D366] hover:bg-[#1da851] disabled:bg-moss-100 disabled:text-ink-soft/50 disabled:cursor-not-allowed text-white py-4 rounded-full font-semibold text-base flex items-center justify-center gap-2.5 transition-all btn-organic shadow-soft"
              >
                <MessageCircle className="w-5 h-5" />
                {submitting ? "Enviando..." : "Enviar pedido por WhatsApp"}
              </button>
            )}

            <div className="flex items-center justify-center gap-2 text-[11px] text-moss-600">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Pedido procesado por la administración de la feria</span>
            </div>
          </footer>
        )}
      </aside>
    </>
  );
}

/* --------- Sub-components --------- */

function CartStep({
  items,
  onUpdateQty,
  onRemove,
  onClearCart,
}: {
  items: CartItem[];
  onUpdateQty: (id: string, q: number) => void;
  onRemove: (id: string) => void;
  onClearCart: () => void;
}) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center px-8 py-20">
        <div className="w-20 h-20 rounded-full bg-moss-100 flex items-center justify-center mb-5">
          <ShoppingBag className="w-9 h-9 text-moss-700" strokeWidth={1.5} />
        </div>
        <h3 className="font-display text-2xl text-ink tracking-tight">
          Tu canasta está vacía
        </h3>
        <p className="text-sm text-ink-soft mt-2 max-w-xs">
          Agregá productos del mercado y aparecerán acá.
        </p>
      </div>
    );
  }

  return (
    <div className="px-5 py-5 space-y-4">
      {items.map((item) => (
        <div
          key={item.product.id}
          className="flex gap-3 pb-4 border-b border-moss-100 last:border-0"
        >
          <img
            src={item.product.image}
            alt={item.product.name}
            className="w-20 h-24 object-cover rounded-xl shrink-0 bg-cream-100"
          />
          <div className="flex-1 min-w-0 flex flex-col">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h4 className="font-display text-base text-ink truncate">
                  {item.product.name}
                </h4>
                <p className="text-[11px] text-moss-600 italic font-display truncate">
                  {item.product.supplier}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onRemove(item.product.id)}
                aria-label="Eliminar"
                className="w-8 h-8 flex items-center justify-center rounded-full text-ink-soft/50 hover:text-terra-500 hover:bg-cream-100 transition-colors -mt-1"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="mt-auto pt-2 flex items-center justify-between">
              <QuantityStepper
                value={item.quantity}
                onChange={(q) => onUpdateQty(item.product.id, q)}
                max={item.product.stock}
                size="sm"
              />
              <span className="font-display text-base text-ink tabular-nums">
                {formatCRC(item.product.price * item.quantity)}
              </span>
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={onClearCart}
        className="text-xs text-ink-soft hover:text-terra-500 underline underline-offset-2 transition-colors"
      >
        Vaciar canasta
      </button>
    </div>
  );
}

function CheckoutStep({
  form,
  onChange,
  selectedZone,
}: {
  form: CheckoutForm;
  onChange: <K extends keyof CheckoutForm>(k: K, v: CheckoutForm[K]) => void;
  selectedZone?: { schedule: string[] };
}) {
  return (
    <div className="px-5 py-6 space-y-7">
      {/* Tipo de entrega */}
      <FieldGroup label="¿Cómo querés recibir tu pedido?">
        <div className="grid grid-cols-2 gap-2">
          <ToggleCard
            active={form.deliveryType === "domicilio"}
            onClick={() => onChange("deliveryType", "domicilio" as DeliveryType)}
            title="A domicilio"
            subtitle="5 zonas"
          />
          <ToggleCard
            active={form.deliveryType === "retiro"}
            onClick={() => onChange("deliveryType", "retiro" as DeliveryType)}
            title="Retiro en feria"
            subtitle="Sin costo"
          />
        </div>
      </FieldGroup>

      {/* Datos personales */}
      <FieldGroup label="Tus datos">
        <Input
          placeholder="Nombre completo"
          value={form.name}
          onChange={(v) => onChange("name", v)}
        />
        <Input
          placeholder="Teléfono (8 dígitos)"
          value={form.phone}
          inputMode="tel"
          onChange={(v) => onChange("phone", v.replace(/[^0-9]/g, "").slice(0, 8))}
        />
      </FieldGroup>

      {/* Dirección y zona — solo si domicilio */}
      {form.deliveryType === "domicilio" && (
        <FieldGroup label="Entrega">
          <Textarea
            placeholder="Dirección exacta (con señas)"
            value={form.address}
            onChange={(v) => onChange("address", v)}
          />
          <div>
            <span className="text-[11px] tracking-[0.18em] uppercase text-moss-600 mb-2 block">
              Zona de entrega
            </span>
            <div className="grid grid-cols-1 gap-1.5">
              {ZONES.map((z) => (
                <button
                  key={z.id}
                  type="button"
                  onClick={() => {
                    onChange("zone", z.id as ZoneId);
                    onChange("schedule", "");
                  }}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl border text-left transition-all ${
                    form.zone === z.id
                      ? "border-moss-800 bg-moss-50"
                      : "border-moss-100 hover:border-moss-400 bg-cream-50"
                  }`}
                >
                  <div>
                    <span className="text-sm font-medium text-ink">
                      Zona {z.id} · {z.name}
                    </span>
                  </div>
                  <span className="text-sm font-display text-moss-700 tabular-nums">
                    {formatCRC(z.fee)}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </FieldGroup>
      )}

      {/* Horario */}
      <FieldGroup label="Horario de entrega">
        {form.deliveryType === "domicilio" && !form.zone ? (
          <p className="text-xs text-ink-soft italic">
            Seleccioná una zona para ver los horarios disponibles.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {(form.deliveryType === "retiro"
              ? ["8:00 — 11:00 AM", "11:00 AM — 2:00 PM", "2:00 — 5:00 PM"]
              : selectedZone?.schedule ?? []
            ).map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => onChange("schedule", slot)}
                className={`px-3 py-3 rounded-xl border text-sm font-medium transition-all ${
                  form.schedule === slot
                    ? "border-moss-800 bg-moss-800 text-cream-50"
                    : "border-moss-100 hover:border-moss-400 bg-cream-50 text-ink"
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        )}
      </FieldGroup>

      {/* Método de pago */}
      <FieldGroup label="Método de pago">
        <div className="grid grid-cols-3 gap-2">
          <PaymentOption
            active={form.paymentMethod === "sinpe"}
            onClick={() => onChange("paymentMethod", "sinpe" as PaymentMethod)}
            label="SINPE"
            sub="Móvil"
          />
          <PaymentOption
            active={form.paymentMethod === "tarjeta"}
            onClick={() => onChange("paymentMethod", "tarjeta" as PaymentMethod)}
            label="Tarjeta"
            sub="Datafono"
          />
          <PaymentOption
            active={form.paymentMethod === "efectivo"}
            onClick={() => onChange("paymentMethod", "efectivo" as PaymentMethod)}
            label="Efectivo"
            sub="Contra entrega"
          />
        </div>
      </FieldGroup>

      <FieldGroup label="Notas (opcional)">
        <Textarea
          placeholder="Ej: dejar con el guarda, sin cilantro, llamar al llegar..."
          value={form.notes}
          onChange={(v) => onChange("notes", v)}
        />
      </FieldGroup>
    </div>
  );
}

/* --- Field primitives --- */

function FieldGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2.5">
      <span className="text-[11px] tracking-[0.18em] uppercase text-moss-700 font-semibold">
        {label}
      </span>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Input({
  placeholder,
  value,
  onChange,
  inputMode,
}: {
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  inputMode?: "text" | "tel" | "numeric" | "email";
}) {
  return (
    <input
      type="text"
      inputMode={inputMode}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-cream-100 border border-transparent focus:bg-cream-50 focus:border-moss-700 focus:ring-2 focus:ring-moss-700/10 rounded-xl px-4 py-3.5 text-[15px] text-ink placeholder:text-ink-soft/50 outline-none transition-all"
    />
  );
}

function Textarea({
  placeholder,
  value,
  onChange,
}: {
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <textarea
      rows={3}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-cream-100 border border-transparent focus:bg-cream-50 focus:border-moss-700 focus:ring-2 focus:ring-moss-700/10 rounded-xl px-4 py-3.5 text-[15px] text-ink placeholder:text-ink-soft/50 outline-none transition-all resize-none"
    />
  );
}

function ToggleCard({
  active,
  onClick,
  title,
  subtitle,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  subtitle: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-left px-4 py-3.5 rounded-xl border transition-all ${
        active
          ? "border-moss-800 bg-moss-800 text-cream-50"
          : "border-moss-100 hover:border-moss-400 bg-cream-50 text-ink"
      }`}
    >
      <div className="font-display text-base leading-tight">{title}</div>
      <div className={`text-[11px] mt-0.5 ${active ? "text-cream-100/80" : "text-ink-soft"}`}>
        {subtitle}
      </div>
    </button>
  );
}

function PaymentOption({
  active,
  onClick,
  label,
  sub,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  sub: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-center justify-center px-2 py-3.5 rounded-xl border transition-all text-center ${
        active
          ? "border-moss-800 bg-moss-50"
          : "border-moss-100 hover:border-moss-400 bg-cream-50"
      }`}
    >
      <span className="text-sm font-semibold text-ink">{label}</span>
      <span className="text-[10px] text-ink-soft mt-0.5">{sub}</span>
    </button>
  );
}
